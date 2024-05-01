const nodemailer = require('nodemailer');
const client = require('twilio')(process.env.TWILIO_SECRET_KEY, process.env.TWILIO_AUTH_TOKEN);

module.exports = {
  sendMail: async (to, subject, message) => {

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.G_USER,
        pass: process.env.G_PASS,
      },
    });

    const mailOptions = {
      from: process.env.G_USER,
      to: to,
      subject: subject,
      html: message,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error(error);
        console.log(error);
      } else {
        logger.info(info);
        console.log('Email sent:' + info.response);
      }
    });
  },

  sendOtp: async (from, to, otp, countryCode) => {
    client.messages.create({
      body: `Your one time password is ${otp}. Thanks XYZ.`,
      to: to, // Text this number
      from: from, // From a valid Twilio number
    }, function (err, message) {
      if (err) {
        console.log(err)
      } else {
        if (message.sid) {
          console.log("Suuccess------", message)
        } else {
          console.log("Error------", message)
        }
      }
    })
  }


}