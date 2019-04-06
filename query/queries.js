const Blockchain = require('../models/Blockchain');
const Building = require('../models/Building');
const Mankani = require('../models/mankani');

var queries = {
    getBlockchain: function () {
        return new Promise(function (resolve, reject) {
            //console.log("Blockchain",Blockchain)
            Blockchain.find().exec(async function (err, blockchain) {
                //console.log("blockchain",blockchain)
                    if (err) {
                        resolve({"status": false, "data": err});
                    } else {
                        resolve({"status": true, "data": blockchain});
                    }
                });
        });
    },
    getBuilding: function () {
        return new Promise(function (resolve, reject) {
            //console.log("Blockchain",Blockchain)
            Building.find().exec(async function (err, blockchain) {
                //console.log("blockchain",blockchain)
                    if (err) {
                        resolve({"status": false, "data": err});
                    } else {
                        resolve({"status": true, "data": blockchain});
                    }
                });
        });
    },
    getMankani: function () {
        return new Promise(function (resolve, reject) {
            //console.log("Blockchain",Blockchain)
            Mankani.find({}).exec(async function (err, blockchain) {
                //console.log("blockchain",blockchain)
                    if (err) {
                        resolve({"status": false, "data": err});
                    } else {
                        resolve({"status": true, "data": blockchain});
                    }
                });
        });
    },
}

module.exports = queries;
