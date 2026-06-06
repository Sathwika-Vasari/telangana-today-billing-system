const pool = require('../config/database');

const reportService = {
  // Get monthly revenue
  getMonthlyRevenue: async () => {
    try {
      const result = await pool.query('SELECT * FROM revenue_analysis LIMIT 12');
      return result.rows;
    } catch (error) {
      console.error('Error getting monthly revenue:', error);
      throw error;
    }
  },

  // Get advertiser performance
  getAdvertiserPerformance: async () => {
    try {
      const result = await pool.query('SELECT * FROM advertiser_summary');
      return result.rows;
    } catch (error) {
      console.error('Error getting advertiser performance:', error);
      throw error;
    }
  },

  // Get campaign status breakdown
  getCampaignStatusBreakdown: async () => {
    try {
      const result = await pool.query(
        'SELECT status, COUNT(*) as count FROM campaigns GROUP BY status'
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting campaign status breakdown:', error);
      throw error;
    }
  },

  // Get payment status summary
  getPaymentStatusSummary: async () => {
    try {
      const result = await pool.query(
        'SELECT status, COUNT(*) as count, COALESCE(SUM(amount), 0) as total FROM payments GROUP BY status'
      );
      return result.rows;
    } catch (error) {
      console.error('Error getting payment status summary:', error);
      throw error;
    }
  },
};

module.exports = reportService;
