var mongoose = require('mongoose');
var combineSchema = new mongoose.Schema(
    {
        PARCEL_ID: {
            type: String
        },
        ZONING_ID: {
            type: String
        },
        ZONING_CODE: {
            type: String
        },
        ENTRY_WHO: {
            type: String
        },
        ENTRY_WHEN: {
            type: String
        },
        HEIGHT_ID: {
            type: String
        },
        HEIGHT_DESC_ENGLISH: {
            type: String
        },
        SETBACK_ID: {
            type: String
        },
        HEIGHT_DESC_ARABIC: {
            type: String
        },
        SETBACK_DESC_ENGLISH: {
            type: String
        },
        SETBACK_DESC_ARABIC: {
            type: String
        },
        LANDUSE_ID: {
            type: String
        },
        LANDUSE_DESC_ENGLISH: {
            type: String
        },
        LANDUSE_DESC_ARABIC: {
            type: String
        },
        TRNS_ID: {
            type: String
        },
        TRNS_TYPE_ID: {
            type: String
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
        MOD_REASON: {
            type: String
        },
        MOD_TYPE: {
            type: String
        },
        PERMIT_NO: {
            type: String
        },
        PROJECT_NO: {
            type: String
        },
        PERMIT_DATE: {
            type: String
        },
        CONSULTANT_NAME_ARB: {
            type: String
        },
        CONSULTANT_NAME_ENG: {
            type: String
        },
        PERMIT_TYPE_ARB: {
            type: String
        },
        PERMIT_TYPE_ENG: {
            type: String
        },
        WORK_DESCRIPTION: {
            type: String
        },

    },
    {
        collection: 'combine'
    },
    {
        timestamps: true
    }
);

mongoose.model('Combine', combineSchema);
module.exports = mongoose.model('Combine', combineSchema);
