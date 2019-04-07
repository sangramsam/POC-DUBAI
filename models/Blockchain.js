var mongoose = require('mongoose');
var blockchainSchema = new mongoose.Schema(
    {
        TRNS_ID: {
            type: Number
        },
        TRNS_TYPE_ID: {
            type: Number
        },
        TRNS_TYPE: {
            type: String
        },
        DATE_STARTED: {
            type: String
        },
        DATE_ENDED: {
            type: String
        },
        ENTRY_UID: {
            type: String
        },
        ENTRY_WHEN: {
            type: String
        },
        COMM_PARCEL_ID: {
            type: Number
        },
        MOD_REASON: {
            type: String
        },
        PARENT_COMM_PARCEL__ID: {
            type: String
        },
        CHILD_COMM_PARCEL__ID: {
            type: String
        },
        TXID: {
            type: String
        }
    },
    {
        collection: 'Blockchain'
    },
    {
        timestamps: true
    },
    );

mongoose.model('Blockchain', blockchainSchema);
module.exports = mongoose.model('Blockchain', blockchainSchema);
