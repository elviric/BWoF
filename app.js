const ethers = require('ethers');
//console.log(ethers);
// Your code here...

const pvtK = '0xddac784931b900196aa7d4150c9912f9dab8b7129e7b159ce82e66540996aed2';
// Your code here...
const provider = ethers.getDefaultProvider('rinkeby', {
    
    alchemy: 'xZuTf24GhCZG2-OUqHABCMoKfu0TgqYV'
});
console.log();
const signer = new ethers.Wallet(pvtK,provider);
const conAddress='0x910E4b6F5a90642c8898c7B83418D7B23A6Ce58F';
const ABI = '[{"inputs":[],"name":"buyTicket","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"drawLottery","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"fulfillRandomness","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"userProvidedSeed","type":"uint256"}],"name":"getRandomNumber","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_keyHash","type":"bytes32"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_seed","type":"uint256"}],"name":"requestRandomness","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_fToken","type":"address"}],"name":"setFAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"badges","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"colors","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"faucetAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomResult","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tickets","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ticketSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winningTicket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]';
const contract = new ethers.Contract(conAddress, ABI, provider);
console.log(signer)
const buy = document.getElementById('buyTicket');

buy.addEventListener('click', function (){
    
    const lotBuy = contract.connect(signer);
    console.log(lotBuy);
    lotBuy.buyTicket().then((r)=>{console.log
    (r)
        document.getElementById('txn').innerHTML ="Ticket bought";
    });

// wait for the transaction to be mined
   // const receipt = await tx.wait();
    //console.log(receipt)

});