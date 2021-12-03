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
}

contract GolfClubRewards is GolfClubPayments {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event RoulletPrize(address _owner, uint256 prizeId);

    uint256 randNonce = 0;
    uint256 coinPrize = 0.15 ether;
    //uint8[] public roulettePrizePercentages = [0, 35, 87, 92, 95, 97]; // Nothing, Repair, ENERGY, COINS, NFT, UPGRADE
    uint8[] public roulettePrizePercentages = [0, 16, 32, 48, 64, 80]; // Nothing, Repair, ENERGY, COINS, NFT, UPGRADE
    //@DEV PERCENTAGES

    mapping(address => uint256) public upgradeBalance;
    mapping(address => uint256) public claimNFTBalance;
    mapping(address => uint256) public energyBalance;
    mapping(address => uint256) public repairBalance;

    function _randMod(uint256 _modulus) internal returns (uint256) {
        randNonce = randNonce.add(1);
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % _modulus;
    }

    function randomRoulletPrize() external {
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
}
