pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "./_GolfClubFactory.sol";

contract GolfClubOwnership is GolfClubFactory, ERC721 {
    using SafeMath for uint256;

    uint mintFee = 0.1 ether;
    uint minimumEthDeposit = 1 ether;
    uint public nextTokenId = 0;

    constructor() ERC721("Golf Club", "GOLFC") {}
    
    modifier onlyOwnerOf(uint _golfClubId) {
        require(msg.sender == ownerOf(_golfClubId));
        _;
    }
    
    function getCollectionByOwner(address _owner) public view returns (uint[] memory) {
        uint balance = balanceOf(_owner);
        uint[] memory result = new uint[](balance);
        uint counter = 0;
        
        for (uint i = 0; i < golf_clubs.length; i++) {
            if (_owner == ownerOf(i)) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function mint(address _to) external payable {
        require(msg.value == mintFee);
        _safeMint(_to, nextTokenId);
        string memory ipfs = createCollectableGolfClub(nextTokenId);
        string memory uri = string(abi.encodePacked('{
    "title": "Asset Metadata",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Identifies the asset to which this NFT represents"
        },
        "description": {
            "type": "string",
            "description": "Describes the asset to which this NFT represents"
        },
        "image": {
            "type": "string",
            "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
        }
    }
}'));
        nextTokenId = nextTokenId.add(1);
    }
    
        function freeMint(address _to) external onlyOwner {
        _safeMint(_to, nextTokenId);
        createCollectableGolfClub(nextTokenId);
        nextTokenId = nextTokenId.add(1);
    } /// @dev Remove when finished
    
    function sendEthToContract() external payable {
        require(msg.value >= minimumEthDeposit);
    }
    
    function sendEthFromContract(address payable _to, uint _amount) external payable onlyOwner {
        _to.transfer(_amount);
    }
}
