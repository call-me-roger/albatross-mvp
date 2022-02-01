pragma solidity ^0.8.0;

import "./_Ownable.sol";
import "./_SafeMath.sol";

interface GolfClubNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function listedToSale(uint256) external view returns (bool);
    function listTokenToSale(uint256 _golfClubId) external;
    function unlistTokenToSale(uint256 _golfClubId) external;
    function safeOperatorTransfer(address _nftOwner, address _toAddress, uint256 _golfClubId) external;
}

contract GolfClubMarketplace is Ownable {
    using SafeMath for uint256;

    event ListingUpdate(uint _golfClubId, uint _price, address _seller, bool _active);

    address public golfClubContractAddress;
    uint256 public nextListingId = 0;
    
    struct ListedToken {
        uint256 price;
        address seller;
    }

    mapping(address => uint) public listingsBalance;
    mapping(uint => ListedToken) public listings;
    mapping(uint => uint) public listingIndexToToken;

    modifier onlyOwnerOf(uint _golfClubId) {
        require(msg.sender == getToken().ownerOf(_golfClubId), "Not the NFT owner.");
        _;
    }

    function setGolfClubContract(address _contractAddress) external onlyOwner {
        golfClubContractAddress = _contractAddress;
    }

    function getToken() public view returns(GolfClubNFT) {
        return GolfClubNFT(golfClubContractAddress);
    }

    function addListing(uint _golfClubId, uint _price) external onlyOwnerOf(_golfClubId) {
        require(getToken().isApprovedForAll(msg.sender, address(this)), "NFT not approved to trade!");
        require(getToken().listedToSale(_golfClubId) == false, "Listing is already active for this token.");
        getToken().listTokenToSale(_golfClubId);
        listings[_golfClubId] = ListedToken(_price, msg.sender);
        listingIndexToToken[nextListingId] = _golfClubId;
        nextListingId = nextListingId.add(1);
        emit ListingUpdate(_golfClubId, _price, msg.sender, true);
    }

    function cancelListing(uint _golfClubId) external onlyOwnerOf(_golfClubId) { // @dev cancelListing must be called also when the Golf Club NFT is traded
        require(getToken().listedToSale(_golfClubId) == true, "Listing is already inactive.");
        getToken().unlistTokenToSale(_golfClubId);
        emit ListingUpdate(_golfClubId, listings[_golfClubId].price, msg.sender, false);
    }

    function purchase(uint _golfClubId) external payable {
        require(msg.sender != listings[_golfClubId].seller, "Can't buy your own token.");
        require(msg.value == listings[_golfClubId].price, "Wrong amount. Invalid purchase.");
        require(getToken().isApprovedForAll(listings[_golfClubId].seller, address(this)), "NFT not approved to trade!");
        require(getToken().listedToSale(_golfClubId) == true, "This listing is not active!");

        getToken().safeOperatorTransfer(listings[_golfClubId].seller, msg.sender, _golfClubId); // Operator transfers the token and disables the listing
        listingsBalance[listings[_golfClubId].seller] = listingsBalance[listings[_golfClubId].seller].add(msg.value); // Add balance to seller
        listings[_golfClubId].seller = msg.sender; // Change NFT seller for this contract
        emit ListingUpdate(_golfClubId, listings[_golfClubId].price, msg.sender, false);
    }

    function paymentToOwner(address payable _to, uint _amount) private {
        _to.transfer(_amount);
    }
    
    function claimOwnerBalance() external {
        require(listingsBalance[msg.sender] > 0 ether, "You don't have any balance to claim.");
        paymentToOwner(payable(msg.sender), listingsBalance[msg.sender]);
        listingsBalance[msg.sender] = 0 ether;
    }
}
