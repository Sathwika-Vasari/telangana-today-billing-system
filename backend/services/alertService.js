const Notification = require('../models/Notification');
const Campaign = require('../models/Campaign');
const Payment = require('../models/Payment');
const pool = require('../config/database');

const alertService = {
  // Generate renewal alerts
  generateRenewalAlerts: async () => {
    try {
      const days = [30, 15, 7, 0];

      for (const day of days) {
        const campaigns = await pool.query(
          `SELECT c.id, c.name, c.renewal_date, a.id as advertiser_id
           FROM campaigns c
           JOIN advertisers a ON c.advertiser_id = a.id
           WHERE c.renewal_date = CURRENT_DATE + INTERVAL '${day} days'
           AND c.status != 'completed'
           AND c.status != 'cancelled'`
        );

        for (const campaign of campaigns.rows) {
          let type, title, message;

          if (day === 30) {
            type = 'renewal_30days';
            title = 'Campaign Renewal in 30 Days';
            message = `Campaign "${campaign.name}" will renew on ${campaign.renewal_date}`;
          } else if (day === 15) {
            type = 'renewal_15days';
            title = 'Campaign Renewal in 15 Days';
            message = `Campaign "${campaign.name}" will renew on ${campaign.renewal_date}`;
          } else if (day === 7) {
            type = 'renewal_7days';
            title = 'Campaign Renewal in 7 Days';
            message = `Campaign "${campaign.name}" will renew on ${campaign.renewal_date}`;
          } else {
            type = 'renewal_today';
            title = 'Campaign Renewal Today';
            message = `Campaign "${campaign.name}" is renewing today`;
          }

          // Create notification for all admin users
          const users = await pool.query('SELECT id FROM users WHERE role = \'admin\'');
          for (const user of users.rows) {
            await Notification.create(user.id, campaign.id, type, title, message);
          }
        }
      }

      console.log('Renewal alerts generated successfully');
    } catch (error) {
      console.error('Error generating renewal alerts:', error);
    }
  },

  // Generate payment alerts
  generatePaymentAlerts: async () => {
    try {
      // Pending payments
      const pendingPayments = await pool.query(
        `SELECT p.id, p.campaign_id, c.name, a.name as advertiser_name
         FROM payments p
         JOIN campaigns c ON p.campaign_id = c.id
         JOIN advertisers a ON c.advertiser_id = a.id
         WHERE p.status = 'pending'
         AND p.payment_date < CURRENT_DATE + INTERVAL '1 day'`
      );

      for (const payment of pendingPayments.rows) {
        const users = await pool.query('SELECT id FROM users WHERE role = \'admin\'');
        for (const user of users.rows) {
          await Notification.create(
            user.id,
            payment.campaign_id,
            'payment_pending',
            'Payment Pending',
            `Payment for campaign "${payment.name}" is pending`
          );
        }
      }

      // Overdue payments
      const overduePayments = await pool.query(
        `SELECT p.id, p.campaign_id, c.name, a.name as advertiser_name
         FROM payments p
         JOIN campaigns c ON p.campaign_id = c.id
         JOIN advertisers a ON c.advertiser_id = a.id
         WHERE p.status = 'pending'
         AND p.payment_date < CURRENT_DATE`
      );

      for (const payment of overduePayments.rows) {
        const users = await pool.query('SELECT id FROM users WHERE role = \'admin\'');
        for (const user of users.rows) {
          await Notification.create(
            user.id,
            payment.campaign_id,
            'payment_overdue',
            'Overdue Payment',
            `Payment for campaign "${payment.name}" is overdue`
          );
        }
      }

      console.log('Payment alerts generated successfully');
    } catch (error) {
      console.error('Error generating payment alerts:', error);
    }
  },

  // Generate campaign ending alerts
  generateCampaignAlerts: async () => {
    try {
      const campaigns = await pool.query(
        `SELECT c.id, c.name, c.end_date
         FROM campaigns c
         WHERE c.end_date = CURRENT_DATE + INTERVAL '7 days'
         AND c.status = 'active'`
      );

      for (const campaign of campaigns.rows) {
        const users = await pool.query('SELECT id FROM users WHERE role = \'admin\'');
        for (const user of users.rows) {
          await Notification.create(
            user.id,
            campaign.id,
            'campaign_ending',
            'Campaign Ending Soon',
            `Campaign "${campaign.name}" is ending on ${campaign.end_date}`
          );
        }
      }

      console.log('Campaign alerts generated successfully');
    } catch (error) {
      console.error('Error generating campaign alerts:', error);
    }
  },
};

module.exports = alertService;
