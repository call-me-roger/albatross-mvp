pragma solidity ^0.8.0;

import "./2_GolfClubPayments.sol";

interface GolfClubNFT {
    function ownerOf(uint256 tokenId) external view returns (address);

    function golf_clubs(uint256 tokenId)
        external
        view
        returns (
            uint256 id,
            uint256 dna,
            uint32 level,
            uint32 readyTime,
            uint16 durability,
            uint16 winCount,
            uint16 lossCount,
            uint16 playType,
            uint8 rarity,
            string memory name
        );

    function durabilityDropRate(uint256) external view returns (uint8);

    function victoryProbability(uint256) external view returns (uint8);

    function triggerCooldown(uint256 tokenId) external;

    function decreaseDurability(uint256 tokenId) external;

    function addGolfClubWin(uint256 tokenId) external;

    function addGolfClubLoss(uint256 tokenId) external;

    function getRandGolfClubType(uint256 _nonce) external view returns (uint16);
}

contract GolfClubGameplay2 is GolfClubPayments {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event RoundPlayed(
        uint256 _golfClubId,
        uint256 _matchResult,
        uint256 _roundId,
        address _owner
    );

    address golfClubContractAddress;
    uint256 gameFee = 0.015 ether;
    uint256 bonusForPerk = 1;
    uint256 nextRoundId = 0;
    uint256 randNonce = 0;
    uint16 roundsPerGame = 18;

    struct Round {
        uint256 id;
        uint16 bonusPerkType;
        uint16 hole;
        bool victory;
    }

    mapping(address => uint256) public victories;
    mapping(address => uint256) public totalRounds;
    mapping(address => Round[]) public playerRounds;

    modifier onlyOwnerOf(uint256 _golfClubId) {
        require(
            msg.sender == getToken().ownerOf(_golfClubId),
            "Not the NFT owner."
        );
        _;
    }

    function setGolfClubContract(address _contractAddress) external onlyOwner {
        golfClubContractAddress = _contractAddress;
    }

    function getGolfClubContractAddress() public view returns (address) {
        return golfClubContractAddress;
    }

    function getToken() public view returns (GolfClubNFT) {
        return GolfClubNFT(golfClubContractAddress);
    }

    modifier canPlayWithGolfClub(uint256 _golfClubId) {
        (
            ,
            ,
            ,
            uint32 readyTime,
            uint16 durability,
            ,
            ,
            ,
            uint8 rarity,

        ) = getToken().golf_clubs(_golfClubId);
        require(
            readyTime <= block.timestamp,
            "This golf club is not ready to play yet."
        );
        require(
            durability >= getToken().durabilityDropRate(rarity),
            "This golf club needs to be repaired"
        );
        //require(listings[_golfClubId].active == false, "This GolfClub is listed on the marketplace. You can't play while listing is active.");
        _;
    }

    function _randMod(uint256 _modulus) internal returns (uint256) {
        randNonce = randNonce.add(1);
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % _modulus;
    }

    function _getMatchResult(uint256 _golfClubId, Round memory _round)
        private
        returns (uint256)
    {
        uint256 rand = _randMod(100);
        uint256 _bonus = 0;

        (, , , , , , , uint16 playType, uint8 rarity, ) = getToken().golf_clubs(
            _golfClubId
        );

        if (_round.bonusPerkType == playType) _bonus.add(bonusForPerk);
        uint256 finalResult = getToken().victoryProbability(rarity) + _bonus;

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
        getToken().decreaseDurability(_golfClubId); // Decrease current durability
        getToken().triggerCooldown(_golfClubId); // 24h cooldown
        emit RoundPlayed(
            _golfClubId,
            _matchResult,
            _currentRound.id,
            msg.sender
        ); // Send event to frontend, filterable by _owner = msg.sender
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
}
