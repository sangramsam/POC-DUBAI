var mongoose = require('mongoose');
var buildingSchema = new mongoose.Schema(
    {
        PARCEL_ID: {
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
        collection: 'Building'
    },
    {
        timestamps: true
    }
    );

mongoose.model('Building', buildingSchema);
module.exports = mongoose.model('Building', buildingSchema);
