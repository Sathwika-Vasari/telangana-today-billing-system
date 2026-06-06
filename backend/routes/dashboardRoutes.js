const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken } = require('../middleware/auth');

// All dashboard routes require authentication
router.use(verifyToken);

// Get dashboard summary
router.get('/summary', dashboardController.getSummary);

module.exports = router;
