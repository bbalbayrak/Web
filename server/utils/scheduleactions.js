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

    const htmlContent = `
    <h1>Inspection Plan Güncelleme</h1>
    <div><strong>Quality Responsible:</strong> ${emails.join(', ')}</div>
    <div><strong>Vendor:</strong> ${plan.vendor_name}</div>
    <div><strong>Date:</strong> ${formatDate(plan.control_date)}</div>
    <p>Proje numarası ${plan.project_number} olan siparişin ${plan.product_name} numaralı ürünü, ${formatDate(plan.control_date)} tarihinde ${plan.control_method} şeklinde ${plan.control_type} yapılacaktır.</p>
    <p>Bilginize.</p>
  `;
  
  console.log(htmlContent); // Log the HTML content
  
  const emailData = {
    to: emails.join(', '),
    cc: 'quality@yenaengineering.nl',
    subject: 'Inspection Plan Güncelleme',
    html: htmlContent,
  };

    await sendEmail(emailData.to, emailData.cc, emailData.subject, emailData.text, emailData.html);
  }
};

const startSchedule = async () => {

    // Saat 09:05'te checkDatabaseAndSendEmails fonksiyonunu çalıştıracak bir schedule belirliyoruz.
    schedule.scheduleJob('5 9 * * *', () => {
      checkDatabaseAndSendEmails();
    });
  };
  
  module.exports = startSchedule;