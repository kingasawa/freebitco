const nodemailer = require('nodemailer');
const { SYSTEM_EMAIL_ACCOUNT, SYSTEM_EMAIL_PASSWORD } = sails.config.custom

const transporter = nodemailer.createTransport({
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

const SendMail = {
  welcome: async(email) => {
    console.log('SYSTEM_EMAIL_ACCOUNT', SYSTEM_EMAIL_ACCOUNT);
    console.log('SYSTEM_EMAIL_PASSWORD', SYSTEM_EMAIL_PASSWORD);
    // create reusable transporter object using the default SMTP transport

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"FREEILU Support" ${SYSTEM_EMAIL_ACCOUNT}`, // sender address
      to: email, // list of receivers
      subject: 'Welcome new user', // Subject line
      //text: "Hello world?", // plain text body
      text: 'Welcome you to FREEILU.COM', // html body
    });

    console.log('Message sent: %s', info.messageId);
    return true
  },

  forgotPassword: async(email, token) => {
    const forgotPassWordUrl = `https://freeilu.com/resetPassword/${token}`
    await transporter.sendMail({
      from: `"FREEILU Support" ${SYSTEM_EMAIL_ACCOUNT}`, // sender address
      to: email, // list of receivers
      subject: 'Reset your password', // Subject line
      //text: "Hello world?", // plain text body
      html: `Click link to reset your password: <a href="">${forgotPassWordUrl}</a>`, // html body
    });
    return true
  },
}

module.exports = SendMail
