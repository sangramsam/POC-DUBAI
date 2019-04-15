var mongoose = require('mongoose');
var ledgerSchema = new mongoose.Schema(
    {
        Date: {
            type: String
        },
        Dept: {
            type: String
        },
        Transaction: {
            type: String
        },
        Details: {
            type: String
        },
        User: {
            type: String
        },
        Document: {
            type: String
        },
        TXID: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

mongoose.model('Ledger', ledgerSchema);
module.exports = mongoose.model('Ledger', ledgerSchema);
