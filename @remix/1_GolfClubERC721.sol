pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.0/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./1_GolfClubFactory.sol";

contract GolfClubERC721 is GolfClubFactory, ERC721URIStorage {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    using SafeMath8 for uint8;
    
    address public gameplayContractAddress;
    uint public nextTokenId = 0;
    uint public maxMintPerWallet = 5;
    uint public maxCollection = 5000;
    uint mintFee = 1 ether;
    uint upgradeGolfClubFee = 0.05 ether;
    uint resetCooldownFee = 0.01 ether;
    string baseURI = "https://gateway.pinata.cloud/ipfs/";
    mapping (uint256 => string) private _tokenURIs;
    mapping (uint256 => bool) public listedToSale;

    constructor() ERC721("Golf Club", "GOLFC") {}
    
    modifier onlyOwnerOf(uint _golfClubId) {
        require(msg.sender == ownerOf(_golfClubId), "Not the owner of this NFT.");
        _;
    }
    
    modifier onlyGameplayContract() {
        require(msg.sender == gameplayContractAddress, "Only the gameplay contract can call.");
        _;
    }

    function setGameplayContract(address _contractAddress) external onlyOwner {
        gameplayContractAddress = _contractAddress;
    }

    function sendEthToContract() external payable {
        require(msg.value > 0 ether);
    }
    
    function sendEthFromContract(address payable _to, uint _amount) external onlyOwner {
        _to.transfer(_amount);
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

    function mint(address _to, uint _quantity) external payable {
        require(_quantity > 0 && _quantity <= maxMintPerWallet, "Can only mint 5 Golf Clubs per wallet.");
        uint newTotal = _quantity.add(golf_clubs.length);
        require(newTotal <= maxCollection, "Exceeds the 5000 max collection limit.");
        uint _qtyMintingFee = mintFee.mul(_quantity);
        require(msg.value == _qtyMintingFee, "Value sent is not correct");

        for(uint i = 0; i < _quantity; i++) {
            _safeMint(_to, nextTokenId);
             string memory ipfs = createCollectableGolfClub(nextTokenId);
            _setTokenURI(nextTokenId, ipfs);
            nextTokenId = nextTokenId.add(1);
        }
    }
    
    function tokenURI(uint256 _golfClubId) public view override returns (string memory) {
        require(_exists(_golfClubId), "ERC721Metadata: URI query for nonexistent token");
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, _tokenURIs[_golfClubId]))
            : '';
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal override {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
    
    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI =  _newBaseURI;
    }
    
    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function listTokenToSale(uint256 _golfClubId) external {
        require(_isApprovedOrOwner(_msgSender(), _golfClubId), "ERC721: listTokenToSale caller is not owner nor approved");
        require(listedToSale[_golfClubId] == false, "NFT already listed to sale!");
        listedToSale[_golfClubId] = true;
    }

    function unlistTokenToSale(uint256 _golfClubId) external {
        require(_isApprovedOrOwner(_msgSender(), _golfClubId), "ERC721: unlistTokenToSale caller is not owner nor approved");
        require(listedToSale[_golfClubId] == true, "NFT is not listed to sale!");
        listedToSale[_golfClubId] = false;
    }
    
    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(address from, address to, uint256 _golfClubId) public override {
        safeTransferFrom(from, to, _golfClubId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(address from, address to, uint256 _golfClubId, bytes memory _data) public override {
        require(listedToSale[_golfClubId] == false, "Can't transfer NFT while listed to sale!");
        require(_isApprovedOrOwner(_msgSender(), _golfClubId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, _golfClubId, _data);
    }

    function safeOperatorTransfer(address _nftOwner, address _toAddress, uint256 _golfClubId) external {
        require(isApprovedForAll(_nftOwner, msg.sender), "Operator not approved to trade NFT!");
        require(listedToSale[_golfClubId] == true, "NFT is not listed to sale!");
        listedToSale[_golfClubId] = false;
        safeTransferFrom(_nftOwner, _toAddress, _golfClubId);
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

    function triggerCooldown(uint256 _golfClubId) external onlyGameplayContract {
        golf_clubs[_golfClubId].readyTime = uint32(golfClubCooldownTime + block.timestamp);
    }

    function addGolfClubWin(uint256 _golfClubId) external onlyGameplayContract {
        golf_clubs[_golfClubId].winCount = golf_clubs[_golfClubId].winCount.add(1);
        golf_clubs[_golfClubId].level = golf_clubs[_golfClubId].level.add(1);
    }

    function addGolfClubLoss(uint256 _golfClubId) external onlyGameplayContract {
        golf_clubs[_golfClubId].lossCount = golf_clubs[_golfClubId]
            .lossCount
            .add(1);
    }

    function decreaseDurability(uint256 _golfClubId) external onlyGameplayContract {
        golf_clubs[_golfClubId].durability = golf_clubs[_golfClubId]
            .durability
            .sub(durabilityDropRate[golf_clubs[_golfClubId].rarity]);
    }
}
