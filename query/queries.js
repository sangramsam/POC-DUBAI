const Blockchain = require('../models/Blockchain');
const Building = require('../models/Building');
const Mankani = require('../models/mankani');
const Parcels = require('../models/Parcels');
const Zoning = require('../models/Zoning');
const User = require('../models/user');
const Ledger = require('../models/ledger');
const Combine = require('../models/combine');
const Certuser = require('../models/certuser');
var _ = require('underscore');
var q = require('q');
var sendTransaction = require('./sendTx');
var queries = {
    getBlockchain: function () {
        return new Promise(function (resolve, reject) {
            //console.log("Blockchain",Blockchain)
            Blockchain.find().exec(async function (err, data) {
                //console.log("blockchain",blockchain)
                if (err) {
                    resolve({"status": false, "data": err});
                } else {
                    resolve({"status": true, "data": data});
                }
            });
        });
    },
    getBuilding: function () {
        return new Promise(function (resolve, reject) {
            //console.log("Blockchain",Blockchain)
            Building.find().exec(async function (err, data) {
                //console.log("blockchain",blockchain)
                if (err) {
                    resolve({"status": false, "data": err});
                } else {
                    resolve({"status": true, "data": data});
                }
            });
        });
    },
    getMankani: function () {
        return new Promise(function (resolve, reject) {
            //console.log("Blockchain",Blockchain)
            Mankani.find({}).exec(async function (err, data) {
                //console.log("blockchain",blockchain)
                if (err) {
                    resolve({"status": false, "data": err});
                } else {
                    resolve({"status": true, "data": data});
                }
            });
        });
    },
    getParcels: function () {
        return new Promise(function (resolve, reject) {
            Parcels.find({}).exec(async function (err, data) {
                if (err) {
                    resolve({"status": false, "data": err});
                } else {
                    resolve({"status": true, "data": data});
                }
            });
        });
    },
    getZoning: function () {
        return new Promise(function (resolve, reject) {
            Zoning.find({}).exec(async function (err, data) {
                if (err) {
                    resolve({"status": false, "data": err});
                } else {
                    resolve({"status": true, "data": data});
                }
            });
        });
    },
    saveMankani: function (data) {
        return new Promise(function (resolve, reject) {
            Mankani.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "mankani": error
                });
                //console.log("saveMankani", data)
                return resolve({
                    "status": true,
                    "mankani": data
                });
            });
        });
    },
    saveParcels: function (data) {
        return new Promise(function (resolve, reject) {
            Parcels.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "Parcels": error
                });
                //console.log("Parcels", data)
                return resolve({
                    "status": true,
                    "Parcels": data
                });
            });
        });
    },
    saveZoning: function (data) {
        return new Promise(function (resolve, reject) {
            Zoning.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "Zoning": error
                });
                console.log("Zoning", data)
                return resolve({
                    "status": true,
                    "Zoning": data
                });
            });
        });
    },
    saveBuilding: function (data) {
        console.log("saveBuilding called");
        return new Promise(function (resolve, reject) {
            Building.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "Building": error
                });
                console.log("Building", data)
                return resolve({
                    "status": true,
                    "Building": data
                });
            });
        });
    },
    saveBlockchain: function (data) {
        return new Promise(function (resolve, reject) {
            Blockchain.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "Blockchain": error
                });
                console.log("Blockchain", data)
                return resolve({
                    "status": true,
                    "Blockchain": data
                });
            });
        });
    },
    saveUser: function (data) {
        return new Promise(function (resolve, reject) {
            User.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "User": error
                });
                return resolve({
                    "status": true,
                    "User": data
                });
            });
        });
    },
    saveLedger: function (data) {
        return new Promise(function (resolve, reject) {
            Ledger.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "Ledger": error
                });
                return resolve({
                    "status": true,
                    "Ledger": data
                });
            });
        });
    },
    getCombine: function (data) {
        return new Promise(function (resolve, reject) {
            Combine.find({}).exec(async function (err, data) {
                if (err) return resolve({
                    "status": false,
                    "Ledger": err
                });
                return resolve({
                    "status": true,
                    "Ledger": data
                });
            });
        });
    },
    getLedger: function (data) {
        return new Promise(function (resolve, reject) {
            Ledger.find({}).exec(async function (err, data) {
                if (err) return resolve({
                    "status": false,
                    "Ledger": err
                });
                return resolve({
                    "status": true,
                    "Ledger": data
                });
            });
        });
    },
    login: function (data) {
        return new Promise(function (resolve, reject) {
            User.find().where({Username: data.username, password: data.password}).exec(function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "User": "username/password Incorrect"
                });
                if (data.length > 0) {
                    return resolve({
                        "status": true,
                        "User": data
                    });
                } else {
                    return resolve({
                        "status": false,
                        "User": "username/password Incorrect"
                    });
                }

            });
        });
    },
    certLogin: function (data) {
        return new Promise(function (resolve, reject) {
            Certuser.find().where({Username: data.username, password: data.password}).exec(function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "User": "username/password Incorrect"
                });
                if (data.length > 0) {
                    return resolve({
                        "status": true,
                        "User": data
                    });
                } else {
                    return resolve({
                        "status": false,
                        "User": "username/password Incorrect"
                    });
                }

            });
        });
    },
    getBlockExplorer: function () {
        return new Promise(function (resolve, reject) {
            var promises = [Mankani.find().where({TXID: {$exists: true}}).exec(), Ledger.find().where({TXID: {$exists: true}}).exec(), Building.find().where({TXID: {$exists: true}}).exec(), Zoning.find().where({TXID: {$exists: true}}).exec()]
            q.all(promises).then(async function (result) {
                    let totalResult = result[0].concat(result[1]);
                    let cc = totalResult.concat(result[2])
                    let c1 = cc.concat(result[3]);
                    // //console.log("result", c1);
                    // for (let i = 0; i < c1.length; i++) {
                    //     //console.log(c1[i]);
                    //     c1[i].date = await sendTransaction.getDateAndTime(c1[i].TXID);
                    // }
                    resolve(c1)
                }
            )
        });
    }
}

module.exports = queries;
