const web3 = require('web3');
const Tx = require('ethereumjs-tx');
const Company = require('../models/company');
const University = require('../models/university');
const School = require('../models/school');
var ObjectId = require('mongodb').ObjectId;
web3js = new web3(new web3.providers.HttpProvider("https://ropsten.infura.io/v3/7df47f101f15415d8fc4b729e9ed53a6"));
const ABI = require('../blockchain/certABI')
var certTransaction = {
    sendCertCompanyTX: function (data) {
        console.log("data", data)
        return new Promise(function (resolve, reject) {
            var myAddress = data.address
            var privateKey = Buffer.from(data.myPrivateKey, 'hex')
            //contract abi is the array that you can get from the ethereum wallet or etherscan
            var contractABI = ABI;
            var contractAddress = "0x68193c331b230f88bf51b596025f75afa116293f";
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
                    "data": contract.methods.createStudentCompany([web3js.utils.fromAscii(data.StudentID), web3js.utils.fromAscii(data.StudentBranch), web3js.utils.fromAscii(data.Gender), web3js.utils.fromAscii(data.DateOfBirth)], data.StudentName, data.studentDocument, data.companyDocument).encodeABI(),
                    "nonce": web3js.utils.toHex(count)
                }
                //console.log(rawTransaction);
                //creating tranaction via ethereumjs-tx
                var transaction = new Tx(rawTransaction);
                //signing transaction with private key
                transaction.sign(privateKey);
                web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex')).on('transactionHash', function (hash) {
                    console.log("hash", hash)
                    Company.findOneAndUpdate({"StudentID": data.StudentID}, {
                        $set: {
                            companyTx: hash,
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
    },
    sendCertSchoolTX: function (data) {
        console.log("data", data)
        return new Promise(function (resolve, reject) {
            var myAddress = data.address
            var privateKey = Buffer.from(data.myPrivateKey, 'hex')
            //contract abi is the array that you can get from the ethereum wallet or etherscan
            var contractABI = ABI;
            var contractAddress = "0x0e12d0ef9d7a3e1bf519fe8649f88e7565e29eb1";
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
                    "data": contract.methods.createStudentSchool([web3js.utils.fromAscii(data.StudentID), web3js.utils.fromAscii(data.StudentBranch), web3js.utils.fromAscii(data.Gender), web3js.utils.fromAscii(data.DateOfBirth)], data.StudentName, data.SchoolDocument).encodeABI(),
                    "nonce": web3js.utils.toHex(count)
                }
                //console.log(rawTransaction);
                //creating tranaction via ethereumjs-tx
                var transaction = new Tx(rawTransaction);
                //signing transaction with private key
                transaction.sign(privateKey);
                web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex')).on('transactionHash', function (hash) {
                    console.log("hash", hash)
                    School.findOneAndUpdate({"StudentID": data.StudentID}, {
                        $set: {
                            SchoolTx: hash,
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
    },
    sendCertUniversityTX: function (data) {
        console.log("data", data);
        return new Promise(function (resolve, reject) {
            var myAddress = data.address
            var privateKey = Buffer.from(data.myPrivateKey, 'hex')
            //contract abi is the array that you can get from the ethereum wallet or etherscan
            var contractABI = ABI;
            var contractAddress = "0x0e12d0ef9d7a3e1bf519fe8649f88e7565e29eb1";
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
                    "data": contract.methods.createStudentUniversity([web3js.utils.fromAscii(data.StudentID), web3js.utils.fromAscii(data.StudentBranch), web3js.utils.fromAscii(data.Gender), web3js.utils.fromAscii(data.DateOfBirth)], data.StudentName, data.SchoolDocument, data.UniversityDocument).encodeABI(),
                    "nonce": web3js.utils.toHex(count)
                }
                //console.log(rawTransaction);
                //creating tranaction via ethereumjs-tx
                var transaction = new Tx(rawTransaction);
                //signing transaction with private key
                transaction.sign(privateKey);
                web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex')).on('transactionHash', function (hash) {
                    console.log("hash", hash)
                    University.findOneAndUpdate({"StudentID": data.StudentID}, {
                        $set: {
                            UniversityTx: hash,
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
    },


}

module.exports = certTransaction;
