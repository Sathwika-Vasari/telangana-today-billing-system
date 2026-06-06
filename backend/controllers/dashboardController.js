const Campaign = require('../models/Campaign');
const Payment = require('../models/Payment');
const pool = require('../config/database');

const dashboardController = {
  // Get dashboard summary
  getSummary: async (req, res, next) => {
    try {
      // Get metrics
      const metricsResult = await pool.query(`
        SELECT
          (SELECT COUNT(*) FROM advertisers) as total_advertisers,
          (SELECT COUNT(*) FROM campaigns WHERE status = 'active') as active_campaigns,
          (SELECT COALESCE(SUM(billing_amount), 0) FROM campaigns) as total_revenue,
          (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status IN ('pending', 'overdue')) as pending_payments,
          (SELECT COUNT(*) FROM campaigns WHERE renewal_date IS NOT NULL AND renewal_date <= CURRENT_DATE + INTERVAL '30 days' AND renewal_date >= CURRENT_DATE) as upcoming_renewals
      `);

      // Get alerts
      const alertsResult = await pool.query(`
        SELECT * FROM notifications WHERE is_read = false ORDER BY created_at DESC LIMIT 10
      `);

      // Get recent activities
      const activitiesResult = await pool.query(`
        SELECT al.*, u.name as user_name FROM audit_logs al
        JOIN users u ON al.user_id = u.id
        ORDER BY al.created_at DESC LIMIT 10
      `);

      const metrics = metricsResult.rows[0];

      res.status(200).json({
        success: true,
        message: 'Dashboard summary retrieved successfully',
        data: {
          metrics: {
            total_advertisers: parseInt(metrics.total_advertisers),
            active_campaigns: parseInt(metrics.active_campaigns),
            total_revenue: parseFloat(metrics.total_revenue),
            pending_payments: parseFloat(metrics.pending_payments),
            upcoming_renewals: parseInt(metrics.upcoming_renewals),
          },
          alerts: alertsResult.rows,
          recent_activities: activitiesResult.rows,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = dashboardController;
