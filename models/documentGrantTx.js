var mongoose = require('mongoose');
var documentSchema = new mongoose.Schema(
  {
    grantId: {
      type: String
    },
     StudentID: {
      type: String
    },
    grantTx: {
      type: String
    },
  },
  {
    timestamps: true
  },
);

mongoose.model('DocumentGrantTx', documentSchema);
module.exports = mongoose.model('DocumentGrantTx', documentSchema);
