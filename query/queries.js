const Blockchain = require('../models/Blockchain');
const Building = require('../models/Building');
const Mankani = require('../models/mankani');
const Parcels = require('../models/Parcels');
const Zoning = require('../models/Zoning');

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
            //console.log("Blockchain",Blockchain)
            Parcels.find({}).exec(async function (err, data) {
                //console.log("blockchain",blockchain)
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
            //console.log("Blockchain",Blockchain)
            Zoning.find({}).exec(async function (err, data) {
                //console.log("blockchain",blockchain)
                    if (err) {
                        resolve({"status": false, "data": err});
                    } else {
                        resolve({"status": true, "data": data});
                    }
                });
        });
    },
}

module.exports = queries;
