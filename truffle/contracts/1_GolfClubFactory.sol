pragma solidity ^0.8.0;

import "./_Ownable.sol";
import "./_SafeMath.sol";
import "./1_GolfClubUtils.sol";

contract GolfClubFactory is GolfClubUtils, Ownable {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    uint256 dnaDigits = 16;
    uint256 dnaModulus = 10**dnaDigits;
    uint256 randNonce = 0;
    uint16[] possibleGolfClubPerk = [100, 200, 300, 400]; // Long, Short, Precision, Obstacle
    uint8[] rarityProbability = [0, 55, 74, 88, 97]; // Common, Uncommon, Rare, Epic, Legendary
    uint8 maxUpgradableRarity = 3;

    string[] private images = [
        "QmUEDKKYBKGd7YFKwWDNUbMgvDwCvEHDW9A7N6YDdNJ4dG",
        "QmPi3V2hRGrKE2biuNZz52ZBxABykgeUvG7sgdRY3jzBxy",
        "QmRtz6v6ybNkKZptrMZRCxoM2eN4w72XxFnvXKCbcT37Yt",
        "QmdavjXFSJP6SLv8QvMTVznCpnP16N88fUVPiUT5LD5kDs",
        "QmVuy4HxTaqppyUXwJ4z8xkTavZYLAogb9tU6UsXRwviCC",
        "QmYQEUjxUpUGNnG1QH6QgCnfS9CPoYt9Cfhx4YYqEf7jxF",
        "QmfFxcnPtAMzeduyWmLmJFWxk2bSJE9NnYNT1GNVZSNiyp"
    ];

    struct GolfClub {
        uint256 id;
        uint256 dna;
        uint32 level;
        uint16 winCount;
        uint16 lossCount;
        uint16 playType;
        uint8 rarity;
        string name;
    }

    GolfClub[] public golf_clubs;

    function _createGolfClub(
        uint256 _id,
        string memory _name,
        uint16 _playType,
        uint256 _dna
    ) private {
        uint8 _rarity = _generateGolfClubRarity();

        golf_clubs.push(
            GolfClub(_id, _dna, 1, 0, 0, _playType, _rarity, _name)
        );
    }

    function _generateRandomDna(string memory _str)
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function getRandGolfClubType(uint256 _nonce) public view returns (uint16) {
        return
            possibleGolfClubPerk[
                _randMod(100, _nonce) % possibleGolfClubPerk.length
            ];
    }

    function _generateGolfClubRarity() private view returns (uint8) {
        uint256 rand = _randMod(100, randNonce);
        if (rand >= rarityProbability[4]) return 4; // 3%
        if (rand >= rarityProbability[3]) return 3; // 9%
        if (rand >= rarityProbability[2]) return 2; // 13%
        if (rand >= rarityProbability[1]) return 1; // 19%;
        return 0; // 56%
    }

    function _randMod(uint256 _modulus, uint256 _nonce)
        internal
        view
        returns (uint256)
    {
        return
            uint256(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, _nonce))
            ) % _modulus;
    }

    function createCollectableGolfClub(uint256 _tokenId)
        internal
        returns (string storage)
    {
        string memory _name = concatGolfClubName(_tokenId);
        randNonce = randNonce.add(1);
        uint16 _playType = getRandGolfClubType(randNonce);
        uint256 randDna = _generateRandomDna(_name);
        randDna = randDna - (randDna % 100);
        _createGolfClub(_tokenId, _name, _playType, randDna);

        uint256 choosenImage = randDna % images.length;
        return images[choosenImage];
    }
}
