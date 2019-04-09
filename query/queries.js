const Blockchain = require('../models/Blockchain');
const Building = require('../models/Building');
const Mankani = require('../models/mankani');
const Parcels = require('../models/Parcels');
const Zoning = require('../models/Zoning');
const User = require('../models/user');

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
    saveMankani:function (data) {
        return new Promise(function (resolve, reject) {
            Mankani.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "mankani": error
                });
                console.log("saveMankani",data)
                return resolve({
                    "status": true,
                    "mankani": data
                });
            });
        });
    },
    saveParcels:function (data) {
        return new Promise(function (resolve, reject) {
            Parcels.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "Parcels": error
                });
                console.log("Parcels",data)
                return resolve({
                    "status": true,
                    "Parcels": data
                });
            });
        });
    },
    saveZoning:function (data) {
        return new Promise(function (resolve, reject) {
            Zoning.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "Zoning": error
                });
                console.log("Zoning",data)
                return resolve({
                    "status": true,
                    "Zoning": data
                });
            });
        });
    },
    saveBuilding:function (data) {
        return new Promise(function (resolve, reject) {
            Building.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "Building": error
                });
                console.log("Building",data)
                return resolve({
                    "status": true,
                    "Building": data
                });
            });
        });
    },
    saveBlockchain:function (data) {
        return new Promise(function (resolve, reject) {
            Blockchain.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "Blockchain": error
                });
                console.log("Blockchain",data)
                return resolve({
                    "status": true,
                    "Blockchain": data
                });
            });
        });
    },
    saveUser:function (data) {
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
    login:function (data) {
        console.log("data",data)
        return new Promise(function (resolve, reject) {
            User.find().where({Username: data.username,password: data.password}).exec(function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "User": "username/password Incorrect"
                });
                if(data.length>0){
                    return resolve({
                        "status": true,
                        "User": data
                    });
                }else{
                    return resolve({
                        "status": false,
                        "User": "username/password Incorrect"
                    });
                }

            });
        });
    },
}

module.exports = queries;
