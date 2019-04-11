var mongoose = require('mongoose');
var certSchema = new mongoose.Schema(
    {
        StudentName: {
            type: String
        },
        StudentBranch: {
            type: String
        },
        StartYear: {
            type: String
        },
        PassYear: {
            type: String
        },
        Sex: {
            type: String
        },
        DateOfBirth: {
            type: String
        },
        CGPA: {
            type: Number
        },
        TXID:{
            type: String
        }
    },
    {
        timestamps: true
    },
);

mongoose.model('Cert', certSchema);
module.exports = mongoose.model('Cert', certSchema);
