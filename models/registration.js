var mongoose = require('mongoose');
var registerSchema = new mongoose.Schema(
  {
    StudentName: {
      type: String
    },
    Email: {
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
    approved: {
      type: Boolean,
       default:false
    },
    approvedBy: {
      type: String
    },
  },
  {
    timestamps: true
  },
);

mongoose.model('Registration', registerSchema);
module.exports = mongoose.model('Registration', registerSchema);
