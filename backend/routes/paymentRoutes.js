const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validatePayment, validatePagination, validateId, handleValidationErrors } = require('../middleware/validation');

// All payment routes require authentication
router.use(verifyToken);

// Get all payments
router.get('/', validatePagination, handleValidationErrors, paymentController.getAll);

// Get single payment
router.get('/:id', validateId, handleValidationErrors, paymentController.getById);

// Admin only routes
router.post('/', isAdmin, validatePayment, handleValidationErrors, paymentController.create);
router.put('/:id', isAdmin, validatePayment, handleValidationErrors, paymentController.update);

module.exports = router;
