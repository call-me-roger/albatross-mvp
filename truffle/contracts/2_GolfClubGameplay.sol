pragma solidity ^0.8.0;

import "./2_GolfClubRewards.sol";

contract GolfClubGameplay is GolfClubRewards {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event RoundPlayed(
        uint256 _golfClubId,
        uint256 _matchResult,
        uint256 _roundId,
        address _owner
    );

    uint256 gameFee = 0.015 ether;
    uint256 golfClubCooldownTime = 1 days;
    uint256 bonusForPerk = 1;
    uint256 nextRoundId = 0;
    uint16 roundsPerGame = 18;
    //uint8[] public victoryProbability = [45, 50, 57, 68, 80]; // Common, Uncommon, Rare, Epic, Legendary
    uint8[] public victoryProbability = [55, 60, 67, 78, 90]; // Common, Uncommon, Rare, Epic, Legendary
    uint8[] public durabilityDropRate = [6, 5, 4, 3, 2]; // Common, Uncommon, Rare, Epic, Legendary

    struct Round {
        uint256 id;
        uint16 bonusPerkType;
        uint16 hole;
        bool victory;
    }

    mapping(address => uint256) public victories;
    mapping(address => uint256) public totalRounds;
    mapping(address => Round[]) public playerRounds;

    modifier canPlayWithGolfClub(uint256 _golfClubId) {
        (, , , , , , uint8 _rarity, ) = getToken().golf_clubs(_golfClubId);
        require(
            getStats(_golfClubId).readyTime <= block.timestamp,
            "This golf club is not ready to play yet."
        );
        require(
            getStats(_golfClubId).durability >= durabilityDropRate[_rarity],
            "This golf club needs to be repaired"
        );
        _;
    }

    function _triggerCooldown(uint256 _golfClubId) private {
        golfClubStats[_golfClubId].readyTime = uint32(
            golfClubCooldownTime + block.timestamp
        );
    }

    function _decreaseDurability(uint256 _golfClubId, uint8 dropDurability)
        private
    {
        golfClubStats[_golfClubId].durability = golfClubStats[_golfClubId]
            .durability
            .sub(dropDurability);
    }

    function _getMatchResult(uint256 _golfClubId, Round memory _round)
        private
        returns (uint256)
    {
        uint256 rand = _randMod(100);
        uint256 _bonus = 0;

        (, , , , , uint16 _playType, uint8 _rarity, ) = getToken().golf_clubs(
            _golfClubId
        );

        if (_round.bonusPerkType == _playType) _bonus.add(bonusForPerk);
        uint256 finalResult = victoryProbability[_rarity] + _bonus;

        if (finalResult >= rand) return 1;
        return 0;
    }

    function addRoundWin() private {
        playerRounds[msg.sender][victories[msg.sender]].victory = true;
        victories[msg.sender] = victories[msg.sender].add(1);
    }

    function afterEachGame(
        uint256 _golfClubId,
        uint256 _matchResult,
        Round memory _currentRound
    ) private {
        if (havePlayed[_golfClubId] == false) {
            golfClubStats[_golfClubId] = Stats(block.timestamp, maxDurability);
            havePlayed[_golfClubId] = true;
        }
        (, , , , , , uint8 _rarity, ) = getToken().golf_clubs(_golfClubId);
        _decreaseDurability(_golfClubId, durabilityDropRate[_rarity]); // Decrease current durability
        _triggerCooldown(_golfClubId); // 24h cooldown

        emit RoundPlayed(
            _golfClubId,
            _matchResult,
            _currentRound.id,
            msg.sender
        ); // Send event to frontend, filterable by _owner = msg.sender

        if (_matchResult == 1 && _currentRound.hole == roundsPerGame)
            randomRoulletPrize();
    }

    function findGame() external payable {
        require(msg.value == gameFee, "Value sent is not correct.");
        for (uint16 i = 0; i < roundsPerGame; i++) {
            randNonce = randNonce.add(1);
            uint16 _playType = getToken().getRandGolfClubType(randNonce);
            playerRounds[msg.sender].push(
                Round(nextRoundId, _playType, i.add(1), false)
            );
            nextRoundId = nextRoundId.add(1);
        }
        totalRounds[msg.sender] = totalRounds[msg.sender].add(roundsPerGame);
    }

    function playRound(uint256 _golfClubId)
        external
        onlyOwnerOf(_golfClubId)
        canPlayWithGolfClub(_golfClubId)
    {
        require(
            playerRounds[msg.sender].length > 0 &&
                playerRounds[msg.sender][victories[msg.sender]].victory ==
                false,
            "You need to find a new game first before playing."
        );
        Round memory _currentRound = playerRounds[msg.sender][
            victories[msg.sender]
        ];
        uint256 matchResult = _getMatchResult(_golfClubId, _currentRound);
        if (matchResult == 1) {
            getToken().addGolfClubWin(_golfClubId);
            addPaymentToClaimBalance();
            addRoundWin();
        } else {
            getToken().addGolfClubLoss(_golfClubId);
        }
        afterEachGame(_golfClubId, matchResult, _currentRound);
    }

    function secondsToPlay(uint256 _golfClubId) public view returns (uint256) {
        if (block.timestamp >= getStats(_golfClubId).readyTime) return 0;
        uint256 diff = (golfClubStats[_golfClubId].readyTime - block.timestamp);
        return diff;
    }
}
