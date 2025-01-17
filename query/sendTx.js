const web3 = require('web3');
const Tx = require('ethereumjs-tx');
const Building = require('../models/Building');
const Mankani = require('../models/mankani');
const Parcels = require('../models/Parcels');
const Zoning = require('../models/Zoning');
var ObjectId = require('mongodb').ObjectId;
web3js = new web3(new web3.providers.HttpProvider("https://ropsten.infura.io/v3/7df47f101f15415d8fc4b729e9ed53a6"));
const ABI = require('../blockchain/pocABI')
const myPrivateKey = "4B8F90BE3B74B677A2CC3109B9E757F3987012DC9E81B702818FB2DD0B82B1A7";
var sendTransaction = {
    sendMakaniTX: function (data) {
        var myAddress = data.address;
        var privateKey = Buffer.from(myPrivateKey, 'hex')
        var toAddress = 'ADRESS_TO_SEND_TRANSACTION';
        //contract abi is the array that you can get from the ethereum wallet or etherscan
        var contractABI = ABI;
        var contractAddress = "0x2df05d98a80eb55d39fe88c5041ee68cf2e7760c";
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
                "data": contract.methods.createNewMakani([web3js.utils.fromAscii(data.MAKANI), web3js.utils.fromAscii(data.LATITUDE), web3js.utils.fromAscii(data.LONGITUDE), web3js.utils.fromAscii(data.ZONE), web3js.utils.fromAscii(data.CREATED_DA), web3js.utils.fromAscii(data.CREATED_US), web3js.utils.fromAscii(data.PARCEL_ID)], data.CNAME_E).encodeABI(),
                "nonce": web3js.utils.toHex(count)
            }
            //console.log(rawTransaction);
            //creating tranaction via ethereumjs-tx
            var transaction = new Tx(rawTransaction);
            //signing transaction with private key
            transaction.sign(privateKey);
            web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex')).on('transactionHash', function (hash) {
                Mankani.findOneAndUpdate({
                    MAKANI: data.MAKANI
                }, {
                    $set: {
                        TXID: hash,
                    }
                }, {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                }, function (error, response) {
                    console.log("error", error)
                    console.log("response", response)
                });
            }).on('error', console.log);
        });
    },
    sendBuilingTX: function (data) {
        return new Promise(function (resolve, reject) {
            var myAddress = data.address;
            var privateKey = Buffer.from(myPrivateKey, 'hex')
            var toAddress = 'ADRESS_TO_SEND_TRANSACTION';
            //contract abi is the array that you can get from the ethereum wallet or etherscan
            var contractABI = ABI;
            var contractAddress = "0x2df05d98a80eb55d39fe88c5041ee68cf2e7760c";
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
                    "data": contract.methods.createNewBuilding([web3js.utils.fromAscii(data.PARCEL_ID), web3js.utils.fromAscii(data.PERMIT_NO), web3js.utils.fromAscii(data.PROJECT_NO), web3js.utils.fromAscii(data.PERMIT_DATE)], data.CONSULTANT_NAME_ARB, data.CONSULTANT_NAME_ENG, data.PERMIT_TYPE_ARB, data.PERMIT_TYPE_ENG, data.WORK_DESCRIPTION).encodeABI(),
                    "nonce": web3js.utils.toHex(count)
                }
                //console.log(rawTransaction);
                //creating tranaction via ethereumjs-tx
                var transaction = new Tx(rawTransaction);
                //signing transaction with private key
                transaction.sign(privateKey);
                web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
                    .on('transactionHash', function (hash) {
                        if (data.update === 'true') {
                            //console.log("if",hash)
                            Building.findOne({"_id": ObjectId(data._id)}, function (err, building) {
                                building.TXID = hash;
                                building.save(function (err) {
                                    if (err) {
                                        console.log('ERROR!');
                                    } else {
                                        resolve(building);
                                    }
                                });
                            });
                        } else {
                            //console.log("else",hash)
                            Building.findOneAndUpdate({
                                PERMIT_NO: data.PERMIT_NO
                            }, {
                                $set: {
                                    TXID: hash,
                                }
                            }, function (error, response) {
                                console.log("response", response)
                                resolve(response);
                            });
                        }

                    }).on('error', console.log);
                ;
            })
        })
    },
    sendParcelsTX: function (data) {
        console.log("data", data)
        return new Promise(function (resolve, reject) {
            var myAddress = data.address;
            var privateKey = Buffer.from(myPrivateKey, 'hex')
            var toAddress = 'ADRESS_TO_SEND_TRANSACTION';
            //contract abi is the array that you can get from the ethereum wallet or etherscan
            var contractABI = ABI;
            var contractAddress = "0x2df05d98a80eb55d39fe88c5041ee68cf2e7760c";
            //creating contract object
            var contract = new web3js.eth.Contract(contractABI, contractAddress);
            //console.log("contract",contract)
            var count;
            // get transaction count, later will used as nonce
            //console.log("web3js.utils", web3js.utils)
            web3js.eth.getTransactionCount(myAddress).then(function (v) {
                console.log("Count: " + v);
                count = v;
                //creating raw tranaction
                var rawTransaction = {
                    "from": myAddress,
                    "to": contractAddress,
                    "gasPrice": web3js.utils.toHex(20 * 1e9),
                    "gasLimit": web3js.utils.toHex(2100000),
                    "data": contract.methods.createNewParcles([web3js.utils.fromAscii(data.PARCEL_ID), web3js.utils.fromAscii(data.TRNS_ID), web3js.utils.fromAscii(data.TRNS_TYPE_ID), web3js.utils.fromAscii(data.TRNS_TYPE),
                        web3js.utils.fromAscii(data.DATE_STARTED), web3js.utils.fromAscii(data.DATE_ENDED), web3js.utils.fromAscii(data.ENTRY_UID), web3js.utils.fromAscii(data.ENTRY_WHEN), web3js.utils.fromAscii(data.MOD_REASON),
                        web3js.utils.fromAscii(data.MOD_TYPE)]).encodeABI(),
                    "nonce": web3js.utils.toHex(count)
                }
                //console.log(rawTransaction);
                //creating tranaction via ethereumjs-tx
                var transaction = new Tx(rawTransaction);
                //signing transaction with private key
                transaction.sign(privateKey);
                //sending transacton via web3js module
                web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
                    .on('transactionHash', function (hash) {
                        // Parcels.findOneAndUpdate({
                        //     PARCEL_ID: data.PARCEL_ID
                        // }, {
                        //     $set: {
                        //         TXID: hash,
                        //     }
                        // }, {
                        //     upsert: true,
                        //     new: true,
                        //     setDefaultsOnInsert: true
                        // }, function (error, response) {
                        //     resolve(response);
                        // });
                        if (data.update === 'true') {
                            //console.log("if",hash)
                            Parcels.findOne({"_id": ObjectId(data._id)}, function (err, parcels) {
                                parcels.TXID = hash;
                                parcels.save(function (err) {
                                    if (err) {
                                        console.log('ERROR!');
                                    } else {
                                        resolve(parcels);
                                    }
                                });
                            });
                        } else {
                            //console.log("else",hash)
                            Parcels.findOneAndUpdate({
                                PARCEL_ID: data.PARCEL_ID
                            }, {
                                $set: {
                                    TXID: hash,
                                }
                            }, {
                                upsert: true,
                                new: true,
                                setDefaultsOnInsert: true
                            }, function (error, response) {
                                console.log("response", response)
                                resolve(response);
                            });
                        }
                    }).on('error', console.log);
            })
        })
    },
    sendZoningTX: function (data) {
        return new Promise(function (resolve, reject) {
            var myAddress = data.address;
            var privateKey = Buffer.from(myPrivateKey, 'hex')
            var toAddress = 'ADRESS_TO_SEND_TRANSACTION';
            //contract abi is the array that you can get from the ethereum wallet or etherscan
            var contractABI = ABI;
            var contractAddress = "0x2df05d98a80eb55d39fe88c5041ee68cf2e7760c";
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
                    "data": contract.methods.createNewZoning([web3js.utils.fromAscii(data.PARCEL_ID), web3js.utils.fromAscii(data.ZONING_ID), web3js.utils.fromAscii(data.ENTRY_WHO), web3js.utils.fromAscii(data.HEIGHT_ID),
                        web3js.utils.fromAscii(data.HEIGHT_DESC_ENGLISH), web3js.utils.fromAscii(data.HEIGHT_DESC_ARABIC), web3js.utils.fromAscii(data.LANDUSE_ID), web3js.utils.fromAscii(data.LANDUSE_DESC_ENGLISH), web3js.utils.fromAscii(data.LANDUSE_DESC_ARABIC),
                        web3js.utils.fromAscii(data.ZONING_CODE), web3js.utils.fromAscii(data.ENTRY_WHEN)], data.SETBACK_DESC_ENGLISH, data.SETBACK_DESC_ARABIC).encodeABI(),
                    "nonce": web3js.utils.toHex(count)
                }
                //console.log(rawTransaction);
                //creating tranaction via ethereumjs-tx
                var transaction = new Tx(rawTransaction);
                //signing transaction with private key
                transaction.sign(privateKey);
                //sending transacton via web3js module
                web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
                    .on('transactionHash', function (hash) {
                        if (data.update === 'true') {
                            Zoning.findOne({"_id": ObjectId(data._id)}, function (err, zoning) {
                                zoning.TXID = hash;
                                zoning.save(function (err) {
                                    if (err) {
                                        console.log('ERROR!');
                                    } else {
                                        resolve(zoning);
                                    }
                                });
                            });
                        } else {
                            Zoning.findOneAndUpdate({
                                ZONING_ID: data.ZONING_ID
                            }, {
                                $set: {
                                    TXID: hash,
                                }
                            }, {
                                upsert: true,
                                new: true,
                                setDefaultsOnInsert: true
                            }, function (error, response) {
                                console.log("response", response)
                                resolve(response)
                            });
                        }
                    }).on('error', console.log);
                ;
            })
        })
    },
    getDateAndTime: function (tx) {
        return new Promise(function (resolve, reject) {
            web3js.eth.getTransaction(tx).then((res) => {
                web3js.eth.getBlock(res.blockNumber).then((date) => {
                    resolve({date: date.timestamp});
                })
            });
        })
    }


}

module.exports = sendTransaction;
