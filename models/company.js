var mongoose = require('mongoose');
var companySchema = new mongoose.Schema(
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
        Sex: {
            type: String
        },
        DateOfBirth: {
            type: String
        },
        companyTx: {
            type: String
        },
        companyDocument: {
            type: String
        },
    },
    {
        timestamps: true
    },
);

mongoose.model('Company', companySchema);
module.exports = mongoose.model('Company', companySchema);
