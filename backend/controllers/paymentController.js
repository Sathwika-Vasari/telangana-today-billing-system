const Payment = require('../models/Payment');
const Campaign = require('../models/Campaign');
const AuditLog = require('../models/AuditLog');

const paymentController = {
  // Get all payments
  getAll: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const filters = {
        status: req.query.status,
        campaign_id: req.query.campaign_id,
      };

      const { payments, total } = await Payment.getAll(limit, offset, filters);

      res.status(200).json({
        success: true,
        message: 'Payments retrieved successfully',
        data: payments,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Get single payment
  getById: async (req, res, next) => {
    try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Payment not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Payment retrieved successfully',
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  },

  // Create payment
  create: async (req, res, next) => {
    try {
      const { campaign_id, amount, payment_date, payment_method, reference_number, status, notes } = req.body;

      // Verify campaign exists
      const campaign = await Campaign.findById(campaign_id);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          message: 'Campaign not found',
        });
      }

      const payment = await Payment.create(
        { campaign_id, amount, payment_date, payment_method, reference_number, status, notes },
        req.user.id
      );

      // Log action
      await AuditLog.create(req.user.id, 'CREATE', 'payment', payment.id, null, JSON.stringify(payment), req.ip, req.get('user-agent'));

      res.status(201).json({
        success: true,
        message: 'Payment created successfully',
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update payment
  update: async (req, res, next) => {
    try {
      const existingPayment = await Payment.findById(req.params.id);
      if (!existingPayment) {
        return res.status(404).json({
          success: false,
          message: 'Payment not found',
        });
      }

      const payment = await Payment.update(req.params.id, req.body);

      // Log action
      await AuditLog.create(req.user.id, 'UPDATE', 'payment', payment.id, JSON.stringify(existingPayment), JSON.stringify(payment), req.ip, req.get('user-agent'));

      res.status(200).json({
        success: true,
        message: 'Payment updated successfully',
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = paymentController;
