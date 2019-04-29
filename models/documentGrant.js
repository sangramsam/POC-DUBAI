var mongoose = require('mongoose');
var documentSchema = new mongoose.Schema(
  {
    grantId: {
      type: String
    },
    StudentID: {
      type: String
    },
    RequestBy: {
      type: String
    },
    GrantFor: {
      type: String
    },
    grantStatus: {
      type: Boolean,
      default: false
    },
    grantDocument: {
      type: String
    },
  },
  {
    timestamps: true
  },
);

mongoose.model('DocumentGrant', documentSchema);
module.exports = mongoose.model('DocumentGrant', documentSchema);
