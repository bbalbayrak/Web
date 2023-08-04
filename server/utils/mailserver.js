const nodemailer = require('nodemailer');

const sendEmail = async (to, cc, subject, text, html) => {
  // E-posta hizmeti sağlayıcınızın SMTP ayarlarını kullanarak bir Nodemailer taşıyıcı oluşturun
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'info_yena@yenaengineering.nl', // your email
      pass: 'Sol74084' // your email password
    },
  });

  // E-posta seçeneklerini ayarlayın
  const InspectionMailOptions = {
    from: 'info_yena@yenaengineering.nl', // sender address
    to: to, // list of receivers
    cc: cc,
    subject: subject, // Subject line
    text: text, // plain text body
    html: html,
  };

  // E-postayı gönderin
  const info = await transporter.sendMail(InspectionMailOptions);
  
  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;