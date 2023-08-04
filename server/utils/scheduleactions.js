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

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [day, month, year].join('-');
  }

  const idToEmail = async id => {
    const user = await User.findByID(id);
    return user.email;
  };
  console.log(`Total entries: ${entries.length}`);
  // Gerekli e-postaları gönderiyoruz.
  for (const entry of entries) {
    const emails = await Promise.all(entry.control_responsible.map(idToEmail));
    console.log(entry)
    const htmlContent = `
    <h1>Inspection Plan Hatırlatma</h1>
    <div><strong>Quality Responsible:</strong> ${emails.join(', ')}</div>
    <div><strong>Vendor:</strong> ${entry.vendor_name}</div>
    <div><strong>Date:</strong> ${formatDate(entry.control_date)}</div>
    <p>Proje numarası ${entry.project_number} olan siparişin ${entry.product_name} numaralı ürünü, ${formatDate(entry.control_date)} tarihinde ${entry.control_method} şeklinde ${entry.control_type} yapılacaktır.</p>
    <p>Bilginize.</p>
  `;
  
  console.log(htmlContent); // Log the HTML content
  
  const emailData = {
    to: 'alperen@yenaengineering.nl',
    //to: emails.join(', '),
    //cc: 'quality@yenaengineering.nl',
    subject: 'Inspection Plan Hatırlatma',
    html: htmlContent,
  };

  const result = await sendEmail(emailData.to, emailData.cc, emailData.subject, emailData.text, emailData.html);
  console.log(`Email sent: ${result}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
}
};

const startSchedule = async () => {

    // Saat 09:05'te checkDatabaseAndSendEmails fonksiyonunu çalıştıracak bir schedule belirliyoruz.
    schedule.scheduleJob('05 12 * * *', () => {
      checkDatabaseAndSendEmails();
    });
  };
  
  module.exports = startSchedule;