const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/auth');
const { validatePagination, validateId, handleValidationErrors } = require('../middleware/validation');

// All notification routes require authentication
router.use(verifyToken);

// Get user notifications
router.get('/', validatePagination, handleValidationErrors, notificationController.getUserNotifications);

// Mark notification as read
router.put('/:id/read', validateId, handleValidationErrors, notificationController.markAsRead);

// Mark all as read
router.put('/all/read', notificationController.markAllAsRead);

module.exports = router;
