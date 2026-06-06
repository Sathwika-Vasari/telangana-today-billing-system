const express = require('express');
const router = express.Router();
const advertiserController = require('../controllers/advertiserController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateAdvertiser, validatePagination, validateId, handleValidationErrors } = require('../middleware/validation');

// All advertiser routes require authentication
router.use(verifyToken);

// Get all advertisers
router.get('/', validatePagination, handleValidationErrors, advertiserController.getAll);

// Get single advertiser
router.get('/:id', validateId, handleValidationErrors, advertiserController.getById);

// Admin only routes
router.post('/', isAdmin, validateAdvertiser, handleValidationErrors, advertiserController.create);
router.put('/:id', isAdmin, validateAdvertiser, handleValidationErrors, advertiserController.update);
router.delete('/:id', isAdmin, validateId, handleValidationErrors, advertiserController.delete);

module.exports = router;
