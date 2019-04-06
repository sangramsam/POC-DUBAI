var mongoose = require('mongoose');
var mankaniSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
        },
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
