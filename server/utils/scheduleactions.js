const sendEmail = require('./mailserver');
const db = require('../config/db');
const schedule = require('node-schedule');
const User = require('../models/user');

const checkDatabaseAndSendEmails = async () => {
  // Günün tarihini alıyoruz.
  const date = new Date();
  // Tarihi iki gün sonrasına ayarlıyoruz.
  date.setDate(date.getDate() + 2);

  // Veritabanını kontrol ediyoruz.
  const entries = await db.query(
    "SELECT * FROM inspectionplan WHERE state = 'Open' AND control_date = $1",
    [date]
  );

  const idToEmail = async id => {
    const user = await User.findByID(id);
    return user.email;
  };

  // Gerekli e-postaları gönderiyoruz.
  for (const entry of entries) {
    const emails = await Promise.all(entry.control_responsible.map(idToEmail));

    const emailData = {
      to: emails.join(', '),
      subject: 'Inspection Plan Hatırlatma',
      text: `Proje numarası ${entry.project_number} olan siparişin ${entry.product_name} numaralı ürünü, ${entry.control_date} tarihinde ${entry.control_method} şeklinde ${entry.control_type} yapılacaktır. Bilginize.`,
    };

    await sendEmail(emailData.to, emailData.subject, emailData.text);
  }
};

const startSchedule = async () => {

    // Saat 14:58'te checkDatabaseAndSendEmails fonksiyonunu çalıştıracak bir schedule belirliyoruz.
    schedule.scheduleJob('34 16 * * *', () => {
      checkDatabaseAndSendEmails();
    });
  };
  
  module.exports = startSchedule;