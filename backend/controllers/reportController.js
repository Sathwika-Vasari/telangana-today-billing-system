const Campaign = require('../models/Campaign');
const Payment = require('../models/Payment');
const Advertiser = require('../models/Advertiser');
const pool = require('../config/database');

const reportController = {
  // Get summary report
  getSummary: async (req, res, next) => {
    try {
      const advertisersResult = await pool.query('SELECT COUNT(*) FROM advertisers');
      const activeCampaignsResult = await pool.query('SELECT COUNT(*) FROM campaigns WHERE status = \'active\'');
      const revenueResult = await pool.query('SELECT COALESCE(SUM(billing_amount), 0) as total FROM campaigns');
      const pendingPaymentsResult = await pool.query('SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status IN (\'pending\', \'overdue\')');
      const renewalsResult = await pool.query('SELECT COUNT(*) FROM campaigns WHERE renewal_date IS NOT NULL AND renewal_date <= CURRENT_DATE + INTERVAL \'30 days\' AND renewal_date >= CURRENT_DATE');

      res.status(200).json({
        success: true,
        message: 'Summary report retrieved successfully',
        data: {
          total_advertisers: parseInt(advertisersResult.rows[0].count),
          active_campaigns: parseInt(activeCampaignsResult.rows[0].count),
          total_revenue: parseFloat(revenueResult.rows[0].total),
          pending_payments: parseFloat(pendingPaymentsResult.rows[0].total),
          upcoming_renewals: parseInt(renewalsResult.rows[0].count),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Get revenue report
  getRevenue: async (req, res, next) => {
    try {
      const period = req.query.period || 'month';

      const result = await pool.query('SELECT * FROM revenue_analysis LIMIT 12');

      res.status(200).json({
        success: true,
        message: 'Revenue report retrieved successfully',
        data: result.rows,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get campaign status report
  getCampaignStatus: async (req, res, next) => {
    try {
      const result = await pool.query(
        'SELECT status, COUNT(*) as count FROM campaigns GROUP BY status'
      );

      res.status(200).json({
        success: true,
        message: 'Campaign status report retrieved successfully',
        data: result.rows,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get renewal report
  getRenewals: async (req, res, next) => {
    try {
      const days = parseInt(req.query.days) || 30;
      const renewals = await Campaign.getUpcomingRenewals(days);

      res.status(200).json({
        success: true,
        message: 'Renewal report retrieved successfully',
        data: renewals,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = reportController;
