var mongoose = require('mongoose');
var buildingSchema = new mongoose.Schema(
    {
        PARCEL_ID: {
            type: Number
        },
        PERMIT_NO: {
            type: Number
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
            type: Number
        },
        WORK_DESCRIPTION: {
            type: String
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
