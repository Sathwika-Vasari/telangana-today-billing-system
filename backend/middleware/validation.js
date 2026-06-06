const { validationResult } = require('express-validator');
const { body, query, param } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

// Validation rules for users
const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('role')
    .isIn(['admin', 'staff'])
    .withMessage('Invalid role'),
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Validation rules for advertisers
const validateAdvertiser = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Advertiser name is required'),
  body('email')
    .isEmail()
    .withMessage('Invalid email format'),
  body('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone must be 10 digits'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'suspended'])
    .withMessage('Invalid status'),
];

// Validation rules for campaigns
const validateCampaign = [
  body('advertiser_id')
    .isInt()
    .withMessage('Valid advertiser ID is required'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Campaign name is required'),
  body('ad_type')
    .isIn(['Banner', 'Video', 'Text', 'Display', 'Social Media', 'Email'])
    .withMessage('Invalid ad type'),
  body('booking_date')
    .isISO8601()
    .withMessage('Invalid booking date'),
  body('start_date')
    .isISO8601()
    .withMessage('Invalid start date'),
  body('end_date')
    .isISO8601()
    .withMessage('Invalid end date'),
  body('billing_amount')
    .isFloat({ min: 0 })
    .withMessage('Billing amount must be a positive number'),
  body('status')
    .optional()
    .isIn(['active', 'paused', 'completed', 'cancelled'])
    .withMessage('Invalid status'),
];

// Validation rules for payments
const validatePayment = [
  body('campaign_id')
    .isInt()
    .withMessage('Valid campaign ID is required'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('payment_method')
    .isIn(['bank_transfer', 'check', 'cash', 'credit_card', 'online'])
    .withMessage('Invalid payment method'),
  body('status')
    .isIn(['paid', 'pending', 'failed', 'overdue'])
    .withMessage('Invalid payment status'),
];

// Pagination validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

// ID validation
const validateId = [
  param('id')
    .isInt()
    .withMessage('Valid ID is required'),
];

module.exports = {
  handleValidationErrors,
  validateRegister,
  validateLogin,
  validateAdvertiser,
  validateCampaign,
  validatePayment,
  validatePagination,
  validateId,
};
