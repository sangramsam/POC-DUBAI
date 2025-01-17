var mongoose = require('mongoose');
var zoningSchema = new mongoose.Schema(
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
        HEIGHT_DESC_ARABIC: {
            type: String
        },
        SETBACK_ID: {
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
        TXID: {
            type: String
        },
        address:{
            type:String
        },
        username:{
            type:String
        }
    },
    {
        collection: 'Zoning'
    },
    {
        timestamps: true
    },
);

mongoose.model('Zoning', zoningSchema);
module.exports = mongoose.model('Zoning', zoningSchema);
