const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailService = {
  // Send email
  sendEmail: async (to, subject, html) => {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@telangantoday.com',
        to,
        subject,
        html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  // Send renewal alert email
  sendRenewalAlert: async (email, campaignName, renewalDate) => {
    const subject = 'Campaign Renewal Alert';
    const html = `
      <h2>Campaign Renewal Alert</h2>
      <p>Your campaign "${campaignName}" will renew on ${renewalDate}</p>
      <p>Please ensure payment is made on time to avoid service disruption.</p>
    `;
    return emailService.sendEmail(email, subject, html);
  },

  // Send payment alert email
  sendPaymentAlert: async (email, campaignName, amount) => {
    const subject = 'Payment Due';
    const html = `
      <h2>Payment Due</h2>
      <p>Payment of Rs. ${amount} is due for campaign "${campaignName}"</p>
      <p>Please make the payment as soon as possible.</p>
    `;
    return emailService.sendEmail(email, subject, html);
  },
};

module.exports = emailService;
