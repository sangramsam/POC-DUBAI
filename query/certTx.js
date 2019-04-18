const web3 = require('web3');
const Tx = require('ethereumjs-tx');
const Cert = require('../models/cert');
var ObjectId = require('mongodb').ObjectId;
web3js = new web3(new web3.providers.HttpProvider("https://ropsten.infura.io/v3/7df47f101f15415d8fc4b729e9ed53a6"));
const ABI = require('../blockchain/certABI')
var certTransaction = {
    sendCertTX: function (data,address,myPrivateKey) {
        return new Promise(function (resolve, reject) {
            var myAddress = address
            var privateKey = Buffer.from(myPrivateKey, 'hex')
            //contract abi is the array that you can get from the ethereum wallet or etherscan
            var contractABI = ABI;
            var contractAddress = "0x31249C23AA368d60d06b71107319BaFe41CE87A6";
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
                    "data": contract.methods.createNewCert([web3js.utils.fromAscii(data.StudentBranch), web3js.utils.fromAscii(data.StartYear), web3js.utils.fromAscii(data.PassYear), web3js.utils.fromAscii(data.Sex), web3js.utils.fromAscii(data.DateOfBirth), web3js.utils.fromAscii(data.CGPA)], data.StudentName).encodeABI(),
                    "nonce": web3js.utils.toHex(count)
                }
                //console.log(rawTransaction);
                //creating tranaction via ethereumjs-tx
                var transaction = new Tx(rawTransaction);
                //signing transaction with private key
                transaction.sign(privateKey);
                web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex')).on('transactionHash', function (hash) {
                    Cert.findOneAndUpdate({"_id": ObjectId(data._id)}, {
                        $set: {
                            TXID: hash,
                        }
                    }, {
                        upsert: true,
                        new: true,
                        setDefaultsOnInsert: true
                    }, function (error, response) {
                        resolve(response)
                    });
                }).on('error', console.log);
            });
        });
    }


}

module.exports = certTransaction;
