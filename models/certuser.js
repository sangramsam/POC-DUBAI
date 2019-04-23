var mongoose = require('mongoose');
var userSchema = new mongoose.Schema(
    {
        Username: {
            type: String
        },
        password: {
            type: String
        },
        address: {
            type: String
        },
        privateKey: {
            type: String
        },
        id: {
            type: String
        },
    },
    {
        timestamps: true
    },
);

mongoose.model('Certuser', userSchema);
module.exports = mongoose.model('Certuser', userSchema);
