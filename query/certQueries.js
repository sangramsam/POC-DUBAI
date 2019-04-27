const School = require('../models/school');
const Student = require('../models/student');
const Registration = require('../models/registration');
const University = require('../models/university');
const Company = require('../models/company');
const User = require('../models/certuser');
const StudentAdditionalCourse = require('../models/studentAdditionalCourse');
var _ = require('underscore');
var q = require('q');
var certTx = require('./certTx');
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
      School.find().sort({"createdAt": -1}).exec(async function (err, data) {
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
        School.find().sort({"createdAt": -1}).where({SchoolTx: {$exists: true}}).exec()]
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
  },
  registerStudent: function (student) {
    return new Promise(function (resolve, reject) {
      Registration.create(student, function (error, data) {
        if (error) return resolve({
          "status": false,
          "student": error
        });
        return resolve({
          "status": true,
          "student": data
        });
      });
    });
  },
  saveAdditionalCourse: function (student) {
    return new Promise(function (resolve, reject) {
      StudentAdditionalCourse.create(student, function (error, data) {
        if (error) return resolve({
          "status": false,
          "student": error
        });
        return resolve({
          "status": true,
          "student": data
        });
      });
    });
  },
  approveAdditionalCourse: function (data) {
    return new Promise(function (resolve, reject) {
      StudentAdditionalCourse.findOneAndUpdate({StudentID: data.StudentID},
        {
          $set: {
            AdminApprove: true,
            ApprovedBy:data.approver
          }
        }, function (error, response) {
          if (error) return resolve({
            "status": false,
            "approve": error
          });
          return resolve({
            "status": true,
            "approve": response
          });
        });
    });
  },
  approveRegistration:  function (data) {
    return new Promise(  function (resolve, reject) {
      Registration.findOneAndUpdate({Email: data.Email},
        {
          $set: {
            approved: true,
            approvedBy:data.approver
          }
        },  async function (error, response) {
          if (error) return resolve({
            "status": false,
            "approve": error
          });
            let student=await certTx.generatePrivateKey(response);
            queries.saveSchool(student);
           return resolve({
            "status": true,
            "approve": response
          });
        });
    });
  },
  getRegistrationRequest: function () {
    return new Promise(function (resolve, reject) {
      Registration.find().exec(async function (error, data) {
        if (error) return resolve({
          "status": false,
          "Request": error
        });
        return resolve({
          "status": true,
          "Request": data
        });
      });
    });
  },
  getDocumentRequest: function () {
    return new Promise(function (resolve, reject) {
      StudentAdditionalCourse.find().exec(async function (error, data) {
        if (error) return resolve({
          "status": false,
          "Request": error
        });
        return resolve({
          "status": true,
          "Request": data
        });
      });
    });
  },
}

module.exports = queries;
