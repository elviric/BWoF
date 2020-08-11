pragma solidity 0.6.6;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/7a4e19a8ff07db1be0b397465d38d175bc0bb5b5/evm-contracts/src/v0.6/VRFConsumerBase.sol";


contract RandomNumberConsumer is VRFConsumerBase {
    
    bytes32 internal keyHash;
    uint256 internal fee;
    string internal Org;
    uint256 public randomResult;
    
  

    address[] public tickets;
    bytes32[] public colors;
    uint256 public ticketSold;
    uint256 public winningTicket;
    
    LinkTokenInterface internal fToken;
    address public faucetAddress = 0x01BE23585060835E02B77ef475b0Cc51aA1e0709;
    
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Rinkeby
     * Chainlink VRF Coordinator address: 0xc1031337fe8E75Cf25CAe9828F3BF734d83732e4
     * LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * Key Hash: 0xcad496b9d0416369213648a32b4975fff8707f05dfb43603961b58f3ac6617a7
     */
    constructor() 
        VRFConsumerBase(
            0xc1031337fe8E75Cf25CAe9828F3BF734d83732e4, // VRF Coordinator
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709  // LINK Token
        ) public
    {
        keyHash = 0xcad496b9d0416369213648a32b4975fff8707f05dfb43603961b58f3ac6617a7;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        Org = "Plasma-Connect Membership";
    }
    
    /** 
     * Requests randomness from a user-provided seed
     */
    function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) > fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee, userProvidedSeed);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) external override {
        require(msg.sender == vrfCoordinator, "Fulfilment only permitted by Coordinator");
        randomResult = randomness;
    }
    
    function claimToken() public returns(bool) {
       
        uint num = randomResult.mod(5);
        
        getRandomNumber(randomResult.mod(120));
        return fToken.transfer(msg.sender,num.mul(fee));
    }
    
    function buyTicket() public returns(bool) {
        
        tickets.push(msg.sender);
        colors.push(bytes32(randomResult.mod(10000000)));
        getRandomNumber(randomResult.mod(120));
        ticketSold = tickets.length;
        return true;
        
    }
    
    function drawLottery() public returns(uint256){
        winningTicket = randomResult.mod(tickets.length);
        
        return winningTicket;
        
    }
    
    function badges() public view returns(  bytes32[] memory){
        return (colors);
    }
    
    function setFAddress(address _fToken) public {
        fToken = LinkTokenInterface(_fToken);
    }
    


    
    
}
