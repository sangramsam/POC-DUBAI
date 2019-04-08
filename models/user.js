var mongoose = require('mongoose');
var userSchema = new mongoose.Schema(
    {
        Username: {
            type: String
        },
        password: {
            type: String
        },
        role: {
            type: String
        },
        address: {
            type: String
        },
    },
    {
        timestamps: true
    },
);

mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);
