var mongoose = require('mongoose');
var universitySchema = new mongoose.Schema(
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
    },
    {
        timestamps: true
    },
);

mongoose.model('University', universitySchema);
module.exports = mongoose.model('University', universitySchema);
