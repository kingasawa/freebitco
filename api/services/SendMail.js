const nodemailer = require('nodemailer');
const { SYSTEM_EMAIL_ACCOUNT, SYSTEM_EMAIL_PASSWORD } = sails.config.custom

const SendMail = {
  welcome: async(email) => {
    console.log('SYSTEM_EMAIL_ACCOUNT', SYSTEM_EMAIL_ACCOUNT);
    console.log('SYSTEM_EMAIL_PASSWORD', SYSTEM_EMAIL_PASSWORD);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Gmail Host
      port: 25, // Port
      secure: false, // this is true as port is 465
      auth: {
        user: SYSTEM_EMAIL_ACCOUNT, // generated ethereal user
        pass: SYSTEM_EMAIL_PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"FREEILU Support" ${SYSTEM_EMAIL_ACCOUNT}`, // sender address
      to: email, // list of receivers
      subject: 'Welcome new user', // Subject line
      //text: "Hello world?", // plain text body
      text: 'Welcome you to FREEILU.COM', // html body
    });

    console.log("Message sent: %s", info.messageId);
  },

  forgotPassword: async(email) => {

  },
}

module.exports = SendMail
