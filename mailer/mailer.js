var nodemailer = require('nodemailer');
var mailer = {
  sendMail: function (data) {
    return new Promise(function (resolve, reject) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sangram@chainflux.com',
          pass: 'Sangram@123'
        }
      });

      var mailOptions = {
        from: 'sangram@chainflux.com',
        to: data.email,
        subject: 'Registration successfully Testing',
        text: 'StudentID: ' + data.StudentID + 'Your passcode is:   ' + data.privateKey,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });
  }


}

module.exports = mailer;
