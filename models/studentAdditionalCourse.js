var mongoose = require('mongoose');
var studentAddSchema = new mongoose.Schema(
  {
    StudentID: {
      type: String
    },
    AdditionalDocument: {
      type: String
    },
    AdditionalDocumentTx: {
      type: String
    },
    DocumentName: {
      type: String
    },
    CourseType: {
      type: String
    },
    Message: {
      type: String
    },
    AdminApprove: {
      type: Boolean,
      default: false
    },
     ApprovedBy: {
      type: String
    }
  },
  {
    timestamps: true
  },
);

mongoose.model('StudentAdditonalDocumt', studentAddSchema);
module.exports = mongoose.model('StudentAdditonalDocumt', studentAddSchema);
