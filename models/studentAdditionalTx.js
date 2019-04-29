var mongoose = require('mongoose');
var studentAddSchema = new mongoose.Schema(
  {
    StudentID: {
      type: String
    },
    docTx: {
      type: String
    }
  },
  {
    timestamps: true
  },
);

mongoose.model('StudentAdditionalTx', studentAddSchema);
module.exports = mongoose.model('StudentAdditionalTx', studentAddSchema);
