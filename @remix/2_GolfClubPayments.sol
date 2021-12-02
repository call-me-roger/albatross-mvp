pragma solidity ^0.8.0;
import "./_SafeMath.sol";
import "./_Ownable.sol";

contract GolfClubPayments is Ownable {
    using SafeMath for uint256;
    
    uint minimumContractDeposit = 1 ether;
    uint winPaymentAmount = 0.015 ether;
    mapping (address => uint) public claimBalance;
    
    function paymentToPlayer(address payable _to, uint _amount) private {
        _to.transfer(_amount);
    }
    
    function addPaymentToClaimBalance() internal {
        claimBalance[msg.sender] = claimBalance[msg.sender].add(winPaymentAmount);
    }
    
    function claimRewards() external {
        require(claimBalance[msg.sender] > 0 ether);
        paymentToPlayer(payable(msg.sender), claimBalance[msg.sender]);
        claimBalance[msg.sender] = 0 ether;
    }
    
    function sendEthToContract() external payable {
        require(msg.value >= minimumContractDeposit);
    }
    
    function sendEthFromContract(address payable _to, uint _amount) external onlyOwner {
        _to.transfer(_amount);
    }
}
