const web3 = require('web3');
const Tx = require('ethereumjs-tx');
const Cert = require('../models/cert');
var ObjectId = require('mongodb').ObjectId;
web3js = new web3(new web3.providers.HttpProvider("https://ropsten.infura.io/v3/7df47f101f15415d8fc4b729e9ed53a6"));
const ABI = require('../blockchain/ledger')
var ledgerTransaction = {
    sendLedgerTX: function (data) {
        return new Promise(function (resolve, reject) {
            var myAddress = data.address
            var privateKey = Buffer.from(data.myPrivateKey, 'hex')
            //contract abi is the array that you can get from the ethereum wallet or etherscan
            var contractABI = ABI;
            var contractAddress = "0xeE68317e659C14C19F7CD60C9299edd7B1033B2f";
            //creating contract object
            var contract = new web3js.eth.Contract(contractABI, contractAddress);
            //console.log("contract",contract)
            var count;
            // get transaction count, later will used as nonce
            //console.log("web3js.utils", web3js.utils)
            web3js.eth.getTransactionCount(myAddress).then(function (v) {
                console.log("Count: " + v);
                count = v;
                var amount = web3js.utils.toHex(1e16);
                //creating raw tranaction
                var rawTransaction = {
                    "from": myAddress,
                    "to": contractAddress,
                    "gasPrice": web3js.utils.toHex(20 * 1e9),
                    "gasLimit": web3js.utils.toHex(2100000),
                    "data": contract.methods.createReport([web3js.utils.fromAscii(data.Date), web3js.utils.fromAscii(data.Dept), web3js.utils.fromAscii(data.Transaction), web3js.utils.fromAscii(data.Details), web3js.utils.fromAscii(data.User), web3js.utils.fromAscii(data.Document)]).encodeABI(),
                    "nonce": web3js.utils.toHex(count)
                }
                //console.log(rawTransaction);
                //creating tranaction via ethereumjs-tx
                var transaction = new Tx(rawTransaction);
                //signing transaction with private key
                transaction.sign(privateKey);
                web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex')).on('transactionHash', function (hash) {
                    resolve(hash)
                }).on('error', console.log);
            });
        });
    }


}

module.exports = ledgerTransaction;
