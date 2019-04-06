var mongoose = require('mongoose');
var parcelsSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        PARCEL_ID: {
            type: String
        },
        TRNS_ID: {
            type: String
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
        MOD_REASON: {
            type: String
        },
        MOD_TYPE: {
            type: String
        },
        TXID: {
            type: String
        }
    },
    {
        collection: 'Parcels'
    },
    {
        timestamps: true
    },
);

mongoose.model('Parcels', parcelsSchema);
module.exports = mongoose.model('Parcels', parcelsSchema);
