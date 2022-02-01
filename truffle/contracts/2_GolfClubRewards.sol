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
            uint16 winCount,
            uint16 lossCount,
            uint16 playType,
            uint8 rarity,
            string memory name
        );

    function durabilityDropRate(uint256) external view returns (uint8);

    function triggerCooldown(uint256 tokenId) external;

    function addGolfClubWin(uint256 tokenId) external;

    function addGolfClubLoss(uint256 tokenId) external;

    function getRandGolfClubType(uint256 _nonce) external view returns (uint16);

    function gameplaySafeMintMint(address _to) external;

    function upgradeGolfClub(uint256 tokenId) external;
}

contract GolfClubRewards is GolfClubPayments {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event RoulletPrize(address _owner, uint256 prizeId);

    address golfClubContractAddress;
    uint256 randNonce = 0;
    uint256 coinPrize = 0.15 ether;
    uint16 maxDurability = 1000;
    //uint8[] public roulettePrizePercentages = [0, 35, 87, 92, 95, 97]; // Nothing, Repair, ENERGY, COINS, NFT, UPGRADE
    uint8[] public roulettePrizePercentages = [0, 16, 32, 48, 64, 80]; // Nothing, Repair, ENERGY, COINS, NFT, UPGRADE
    //@DEV PERCENTAGES

    struct Stats {
        uint256 readyTime;
        uint16 durability;
    }

    Stats[10000] public golfClubStats;

    mapping(address => uint256) public upgradeBalance;
    mapping(address => uint256) public claimNFTBalance;
    mapping(address => uint256) public energyBalance;
    mapping(address => uint256) public repairBalance;
    mapping(uint256 => bool) public havePlayed;

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

    function getStats(uint256 _golfClubId) public view returns (Stats memory) {
        if (havePlayed[_golfClubId] == false) {
            return Stats(block.timestamp, maxDurability);
        }

        return golfClubStats[_golfClubId];
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

    function randomRoulletPrize() internal {
        uint256 rand = _randMod(100);
        if (rand >= roulettePrizePercentages[5]) {
            upgradeBalance[msg.sender] = upgradeBalance[msg.sender].add(1); // 2%
            emit RoulletPrize(msg.sender, 5);
            return;
        }
        if (rand >= roulettePrizePercentages[4]) {
            claimNFTBalance[msg.sender] = claimNFTBalance[msg.sender].add(1); // 2%
            emit RoulletPrize(msg.sender, 4);
            return;
        }
        if (rand >= roulettePrizePercentages[3]) {
            addPaymentToClaimBalance(); // 3%
            emit RoulletPrize(msg.sender, 3);
            return;
        }
        if (rand >= roulettePrizePercentages[2]) {
            energyBalance[msg.sender] = energyBalance[msg.sender].add(1); // 5%
            emit RoulletPrize(msg.sender, 2);
            return;
        }
        if (rand >= roulettePrizePercentages[1]) {
            repairBalance[msg.sender] = repairBalance[msg.sender].add(1); // 52%;
            emit RoulletPrize(msg.sender, 1);
            return;
        }
        emit RoulletPrize(msg.sender, 0);
    }

    function claimNFT() external {
        require(
            claimNFTBalance[msg.sender] > 0,
            "You don't have any NFT claim available!"
        );
        claimNFTBalance[msg.sender] = claimNFTBalance[msg.sender].sub(1);
        getToken().gameplaySafeMintMint(msg.sender);
    }

    function claimUpgrade(uint256 _golfClubId)
        external
        onlyOwnerOf(_golfClubId)
    {
        require(
            upgradeBalance[msg.sender] > 0,
            "You don't have any Upgrade claim avaliable!"
        );
        upgradeBalance[msg.sender] = upgradeBalance[msg.sender].sub(1);
        getToken().upgradeGolfClub(_golfClubId);
    }

    function claimResetCooldown(uint256 _golfClubId)
        external
        onlyOwnerOf(_golfClubId)
    {
        require(
            energyBalance[msg.sender] > 0,
            "You don't have any energy claim avaliable!"
        );
        require(
            block.timestamp < golfClubStats[_golfClubId].readyTime,
            "Golf Club is already full charged!"
        );
        energyBalance[msg.sender] = energyBalance[msg.sender].sub(1);
        golfClubStats[_golfClubId].readyTime = block.timestamp;
    }

    function claimResetDurability(uint256 _golfClubId)
        external
        onlyOwnerOf(_golfClubId)
    {
        require(
            repairBalance[msg.sender] > 0,
            "You don't have any repair kit avaliable!"
        );
        require(
            maxDurability > golfClubStats[_golfClubId].durability,
            "Golf Club is already full durability!"
        );
        repairBalance[msg.sender] = repairBalance[msg.sender].sub(1);
        golfClubStats[_golfClubId].durability = maxDurability;
    }

    function testBalance() external onlyOwner {
        energyBalance[msg.sender] = 1000;
        repairBalance[msg.sender] = 1000;
        upgradeBalance[msg.sender] = 1000;
        claimNFTBalance[msg.sender] = 1000;
        claimBalance[msg.sender] = 1000;
    }
}
