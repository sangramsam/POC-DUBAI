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
            School.findOneAndUpdate({StudentID: data.StudentID},
                {
                    $set: {
                        UniversityDocument: data.UniversityDocument,
                    }
                }, function (error, response) {
                    //console.log("response", response)
                    resolve(response);
                });
        });
    },
    saveCompany: function (data) {
        return new Promise(function (resolve, reject) {
            School.findOneAndUpdate({StudentID: data.StudentID},
                {
                    $set: {
                        CompanyDocument: data.CompanyDocument,
                    }
                }, function (error, response) {
                    resolve(response);
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
    getBlockExplorer: function () {
        return new Promise(function (resolve, reject) {
            var promises = [
                School.find().where({SchoolTx: {$exists: true}}).exec()]
                q.all(promises).then(function (result) {
                   // console.log("result", result);
                    let totalResult = result[0]
                    resolve(totalResult)
                }
            )
        });
    },
    searchStudent: function (studentId) {
        return new Promise(function (resolve, reject) {
            var promises = [
                School.find().exec(),]
                 q.all(promises).then(function (result) {
                    let totalResult = result[0];
                    let student = _.find(totalResult, (key) => key.StudentID === studentId);
                    if (student) {
                        resolve([student]);
                    } else {
                        resolve([]);
                    }
                }
            )
        });
    }
}

module.exports = queries;
