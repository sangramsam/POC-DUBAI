var mongoose = require('mongoose');
var mankaniSchema = new mongoose.Schema(
    {
        CNAME_E: {
            type: String
        },
        MAKANI: {
            type: String
        },
        LATITUDE: {
            type: Number
        },
        LONGITUDE: {
            type: Number
        },
        ZONE: {
            type: String
        },
        CREATED_US: {
            type: String
        },
        CREATED_DA: {
            type: String
        },
        PARCEL_ID: {
            type: Number
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
        collection: 'mankani'
    },
    {
        timestamps: true
    },
);

mongoose.model('Mankani', mankaniSchema);
module.exports = mongoose.model('Mankani', mankaniSchema);
