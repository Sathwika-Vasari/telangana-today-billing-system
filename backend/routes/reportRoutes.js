const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken } = require('../middleware/auth');

// All report routes require authentication
router.use(verifyToken);

// Get summary report
router.get('/summary', reportController.getSummary);

// Get revenue report
router.get('/revenue', reportController.getRevenue);

// Get campaign status report
router.get('/campaign-status', reportController.getCampaignStatus);

// Get renewal report
router.get('/renewals', reportController.getRenewals);

module.exports = router;
