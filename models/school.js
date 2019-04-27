var mongoose = require('mongoose');
var schoolSchema = new mongoose.Schema(
  {
    StudentID: {
      type: String
    },
    StudentName: {
      type: String
    },
    StudentBranch: {
      type: String
    },
    Gender: {
      type: String
    },
    DateOfBirth: {
      type: String
    },
    SchoolTx: {
      type: String
    },
    SchoolDocument: {
      type: String
    },
    UniversityTx: {
      type: String
    },
    UniversityDocument: {
      type: String
    },
    CompanyTx: {
      type: String
    },
    CompanyDocument: {
      type: String
    },
    EmiratesID: {
      type: String
    },
    SmartPass: {
      type: String
    },
    privateKey: {
      type: String
    },
    address: {
      type: String
    },
    Email: {
      type: String
    },
  },
  {
    timestamps: true
  },
);

mongoose.model('School', schoolSchema);
module.exports = mongoose.model('School', schoolSchema);
