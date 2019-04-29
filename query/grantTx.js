const web3 = require('web3');
const Tx = require('ethereumjs-tx');
const Company = require('../models/company');
const StudentAdditonalDocumt = require('../models/studentAdditionalCourse');
const DocumentGrant = require('../models/documentGrant');
const DocumentGrantTx = require('../models/documentGrantTx');
const StudentAdditionalTx = require('../models/studentAdditionalTx');
const School = require('../models/school');
var ObjectId = require('mongodb').ObjectId;
var Wallet = require('ethereumjs-wallet');
web3js = new web3(new web3.providers.HttpProvider("https://ropsten.infura.io/v3/7df47f101f15415d8fc4b729e9ed53a6"));
const ABI = require('../blockchain/grantABI')
const mailer = require('../mailer/mailer')
const queries = require('./certQueries')
var contractAddressGrant = "0x82B864D79E8958846219113535323A11641D17D8";
var AddressGrant = "0x7F04f856fc01205239858E2313731De3BDf6C71F";
var privateKeys = "DEE7895AF973BAEF1ACEA5F7A38A261B6B9B4A2534B390855119FAB832A0D78F";

var grantTransaction = {
  createAdditionalDocument: function (data) {
    console.log("student", data);
    //console.log([web3js.utils.fromAscii(data.StudentID), web3js.utils.fromAscii(data.DocumentName), web3js.utils.fromAscii(data.CourseType), web3js.utils.fromAscii(data.CourseName), web3js.utils.fromAscii(data.AdminApprove), web3js.utils.fromAscii(data.ApprovedBy ? data.ApprovedBy : '')]);
    //console.log(data.AdditionalDocument + "" + data.Message)
    return new Promise(function (resolve, reject) {
      var myAddress = AddressGrant;
      var privateKey = Buffer.from(privateKeys, 'hex');
      //contract abi is the array that you can get from the ethereum wallet or etherscan
      var contractABI = ABI;
      var contractAddress = contractAddressGrant;
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
          "data": contract.methods.createAdditonalDocument([web3js.utils.fromAscii(data.StudentID), web3js.utils.fromAscii(data.DocumentName), web3js.utils.fromAscii(data.CourseType), web3js.utils.fromAscii(data.CourseName ? data.CourseName : ''), web3js.utils.fromAscii(data.AdminApprove), web3js.utils.fromAscii(data.ApprovedBy ? data.ApprovedBy : '')], data.AdditionalDocument, data.Message).encodeABI(),
          "nonce": web3js.utils.toHex(count)
        }
        //console.log(rawTransaction);
        //creating tranaction via ethereumjs-tx
        var transaction = new Tx(rawTransaction);
        //signing transaction with private key
        transaction.sign(privateKey);
        web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex')).on('transactionHash', function (hash) {
          console.log("hash", hash)
          data.docTx = hash
         // console.log("data", data)
          let da = {
            StudentID: data.StudentID,
            docTx: data.docTx
          }
          StudentAdditionalTx.create(da, function (error, response) {
            if (error) return resolve({
              "status": false,
              "grant": error
            });
            return resolve({
              "status": true,
              "grant": response
            });
          });
        });
      });
    });
  },
  createGrantDocumentsTx: function (data) {
    //console.log("data", data)
    return new Promise(function (resolve, reject) {
      var myAddress = AddressGrant;
      var privateKey = Buffer.from(privateKeys, 'hex');
      //contract abi is the array that you can get from the ethereum wallet or etherscan
      var contractABI = ABI;
      var contractAddress = contractAddressGrant;
      //creating contract object
      var contract = new web3js.eth.Contract(contractABI, contractAddress);
      //console.log("contract",contract)
      var count;
      // get transaction count, later will used as nonce
      //console.log("web3js.utils", web3js.utils)
      web3js.eth.getTransactionCount(myAddress).then(function (v) {
        console.log("Count: " + v);
        count = v;
        var rawTransaction = {
          "from": myAddress,
          "to": contractAddress,
          "gasPrice": web3js.utils.toHex(20 * 1e9),
          "gasLimit": web3js.utils.toHex(2100000),
          "data": contract.methods.createGrantDocuments([web3js.utils.fromAscii(data.grantId), web3js.utils.fromAscii(data.StudentID), web3js.utils.fromAscii(data.RequestBy?data.RequestBy:''), web3js.utils.fromAscii(data.GrantFor), web3js.utils.fromAscii(data.grantStatus)], data.grantDocument).encodeABI(),
          "nonce": web3js.utils.toHex(count)
        }
        //console.log(rawTransaction);
        //creating tranaction via ethereumjs-tx
        var transaction = new Tx(rawTransaction);
        //signing transaction with private key
        transaction.sign(privateKey);
        web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex')).on('transactionHash', function (hash) {
          console.log("hash", hash)
          let da={
          grantId:data.grantId,
          grantTx:hash,
          StudentID:data.StudentID
          }
          DocumentGrantTx.create(da, function (error, response) {
            if (error) return resolve({
              "status": false,
              "grant": error
            });
            return resolve({
              "status": true,
              "grant": response
            });
          });
        });
      });
    });
  },
}
module.exports = grantTransaction;
