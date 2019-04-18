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
    },
    {
        timestamps: true
    },
);

mongoose.model('School', schoolSchema);
module.exports = mongoose.model('School', schoolSchema);
