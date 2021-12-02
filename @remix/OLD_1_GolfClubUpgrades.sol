pragma solidity ^0.8.0;

import "./1_GolfClubERC721.sol";

contract GolfClubUpgrade is GolfClubERC721 {
    using SafeMath32 for uint32;
    using SafeMath8 for uint8;
    
    uint upgradeGolfClubFee = 0.05 ether;
    uint resetCooldownFee = 0.01 ether;

    function _triggerCooldown(GolfClub storage _golfClub) internal {
        _golfClub.readyTime = uint32(golfClubCooldownTime + block.timestamp);
    }
    
    function secondsToPlay(uint _golfClubId) public view returns (uint) {
        if(block.timestamp >= golf_clubs[_golfClubId].readyTime) return 0;
        uint diff = (golf_clubs[_golfClubId].readyTime - block.timestamp);
        return diff;
    }

    function upgradeGolfClub(uint _golfClubId) external payable onlyOwnerOf(_golfClubId) {
        require(msg.value == upgradeGolfClubFee, "Value sent is not correct.");
        require(golf_clubs[_golfClubId].rarity < maxUpgradableRarity, "Your Golf Club can't upgrade rarity.");
        golf_clubs[_golfClubId].level = golf_clubs[_golfClubId].level.add(1);
        golf_clubs[_golfClubId].rarity = golf_clubs[_golfClubId].rarity.add(1);
    }
    
    function resetCooldown(uint256 _golfClubId) external payable {
        require(msg.value == resetCooldownFee, "Value sent is not correct.");
        golf_clubs[_golfClubId].readyTime = uint32(block.timestamp);
    }
}
