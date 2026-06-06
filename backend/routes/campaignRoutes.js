const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateCampaign, validatePagination, validateId, handleValidationErrors } = require('../middleware/validation');

// All campaign routes require authentication
router.use(verifyToken);

// Get all campaigns
router.get('/', validatePagination, handleValidationErrors, campaignController.getAll);

// Get single campaign
router.get('/:id', validateId, handleValidationErrors, campaignController.getById);

// Admin only routes
router.post('/', isAdmin, validateCampaign, handleValidationErrors, campaignController.create);
router.put('/:id', isAdmin, validateCampaign, handleValidationErrors, campaignController.update);
router.delete('/:id', isAdmin, validateId, handleValidationErrors, campaignController.delete);

module.exports = router;
