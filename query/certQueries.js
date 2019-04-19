const School = require('../models/school');
const Student = require('../models/student');
const University = require('../models/university');
const Company = require('../models/company');
const User = require('../models/certuser');
var _ = require('underscore');
var q = require('q');
var queries = {
    getStudent: function () {
        return new Promise(function (resolve, reject) {
            //console.log("Blockchain",Blockchain)
            Student.find().exec(async function (err, data) {
                //console.log("blockchain",blockchain)
                if (err) {
                    resolve({"status": false, "data": err});
                } else {
                    resolve({"status": true, "data": data});
                }
            });
        });
    },
    getSchoolStudent: function () {
        return new Promise(function (resolve, reject) {
            //console.log("Blockchain",Blockchain)
            School.find().exec(async function (err, data) {
                //console.log("blockchain",blockchain)
                if (err) {
                    resolve({"status": false, "data": err});
                } else {
                    resolve({"status": true, "data": data});
                }
            });
        });
    },
    getCompanyStundent: function () {
        return new Promise(function (resolve, reject) {
            //console.log("Blockchain",Blockchain)
            Company.find().exec(async function (err, data) {
                //console.log("blockchain",blockchain)
                if (err) {
                    resolve({"status": false, "data": err});
                } else {
                    resolve({"status": true, "data": data});
                }
            });
        });
    },
    getUniversityStudent: function () {
        return new Promise(function (resolve, reject) {
            //console.log("Blockchain",Blockchain)
            University.find({}).exec(async function (err, data) {
                //console.log("blockchain",blockchain)
                if (err) {
                    resolve({"status": false, "data": err});
                } else {
                    resolve({"status": true, "data": data});
                }
            });
        });
    },
    saveSchool: function (data) {
        return new Promise(function (resolve, reject) {
            School.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "school": error
                });
                return resolve({
                    "status": true,
                    "school": data
                });
            });
        });
    },
    saveUniversity: function (data) {
        return new Promise(function (resolve, reject) {
            University.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "university": error
                });
                //console.log("Parcels", data)
                return resolve({
                    "status": true,
                    "university": data
                });
            });
        });
    },
    saveCompany: function (data) {
        return new Promise(function (resolve, reject) {
            Company.create(data, function (error, data) {
                if (error) return resolve({
                    "status": false,
                    "company": error
                });
                //console.log("Parcels", data)
                return resolve({
                    "status": true,
                    "company": data
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
    // getCombine: function (data) {
    //     return new Promise(function (resolve, reject) {
    //         Combine.find({}).exec(async function (err, data) {
    //             if (err) return resolve({
    //                 "status": false,
    //                 "Ledger": err
    //             });
    //             return resolve({
    //                 "status": true,
    //                 "Ledger": data
    //             });
    //         });
    //     });
    // },
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
    // getBlockExplorer: function () {
    //     return new Promise(function (resolve, reject) {
    //         var promises = [Mankani.find().where({TXID: {$exists: true}}).exec(),Ledger.find().where({TXID: {$exists: true}}).exec(), Building.find().where({TXID: {$exists: true}}).exec(), Zoning.find().where({TXID: {$exists: true}}).exec()]
    //         q.all(promises).then(function (result) {
    //                 console.log("result", result);
    //                 let totalResult = result[0].concat(result[1]);
    //                 totalResult.concat(result[2])
    //                 totalResult.concat(result[3])
    //                 resolve(totalResult)
    //             }
    //         )
    //     });
    // }
}

module.exports = queries;
