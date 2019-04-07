const web3 = require('web3');
const Tx = require('ethereumjs-tx');
web3js = new web3(new web3.providers.HttpProvider("https://ropsten.infura.io/v3/7df47f101f15415d8fc4b729e9ed53a6"));


var sendTransaction = {
    sendTx: function () {
        return new Promise(function (resolve, reject) {
            var myAddress = 'ADDRESS_THAT_SENDS_TRANSACTION';
            var privateKey = Buffer.from('YOUR_PRIVATE_KEY', 'hex')
            var toAddress = 'ADRESS_TO_SEND_TRANSACTION';
            //contract abi is the array that you can get from the ethereum wallet or etherscan
            var contractABI =YOUR_CONTRACT_ABI;
            var contractAddress ="YOUR_CONTRACT_ADDRESS";
            //creating contract object
            var contract = new web3js.eth.Contract(contractABI,contractAddress);

            var count;
            // get transaction count, later will used as nonce
            web3js.eth.getTransactionCount(myAddress).then(function(v){
                console.log("Count: "+v);
                count = v;
                var amount = web3js.utils.toHex(1e16);
                //creating raw tranaction
                var rawTransaction = {"from":myAddress, "gasPrice":web3js.utils.toHex(20* 1e9),"gasLimit":web3js.utils.toHex(210000),"to":contractAddress,"value":"0x0","data":contract.methods.transfer(toAddress, amount).encodeABI(),"nonce":web3js.utils.toHex(count)}
                console.log(rawTransaction);
                //creating tranaction via ethereumjs-tx
                var transaction = new Tx(rawTransaction);
                //signing transaction with private key
                transaction.sign(privateKey);
                //sending transacton via web3js module
                web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
                    .on('transactionHash',console.log);

                contract.methods.balanceOf(myAddress).call()
                    .then(function(balance){console.log(balance)});
            })
        });
    }
}

module.exports = sendTransaction;
