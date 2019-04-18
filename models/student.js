var mongoose = require('mongoose');
var studentSchema = new mongoose.Schema(
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
        StudentTx: {
            type: String
        },
        StudentDocument: {
            type: String
        },
    },
    {
        timestamps: true
    },
);

mongoose.model('Student', studentSchema);
module.exports = mongoose.model('Student', studentSchema);
