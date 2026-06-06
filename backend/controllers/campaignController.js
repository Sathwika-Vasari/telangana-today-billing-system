const Campaign = require('../models/Campaign');
const AuditLog = require('../models/AuditLog');
const Advertiser = require('../models/Advertiser');

const campaignController = {
  // Get all campaigns
  getAll: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const filters = {
        status: req.query.status,
        advertiser_id: req.query.advertiser_id,
        search: req.query.search,
      };

      const { campaigns, total } = await Campaign.getAll(limit, offset, filters);

      res.status(200).json({
        success: true,
        message: 'Campaigns retrieved successfully',
        data: campaigns,
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

  // Get single campaign
  getById: async (req, res, next) => {
    try {
      const campaign = await Campaign.findById(req.params.id);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          message: 'Campaign not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Campaign retrieved successfully',
        data: campaign,
      });
    } catch (error) {
      next(error);
    }
  },

  // Create campaign
  create: async (req, res, next) => {
    try {
      const { advertiser_id, name, ad_type, booking_date, start_date, end_date, billing_amount, status, renewal_date, description } = req.body;

      // Verify advertiser exists
      const advertiser = await Advertiser.findById(advertiser_id);
      if (!advertiser) {
        return res.status(404).json({
          success: false,
          message: 'Advertiser not found',
        });
      }

      const campaign = await Campaign.create(
        { advertiser_id, name, ad_type, booking_date, start_date, end_date, billing_amount, status, renewal_date, description },
        req.user.id
      );

      // Log action
      await AuditLog.create(req.user.id, 'CREATE', 'campaign', campaign.id, null, JSON.stringify(campaign), req.ip, req.get('user-agent'));

      res.status(201).json({
        success: true,
        message: 'Campaign created successfully',
        data: campaign,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update campaign
  update: async (req, res, next) => {
    try {
      const existingCampaign = await Campaign.findById(req.params.id);
      if (!existingCampaign) {
        return res.status(404).json({
          success: false,
          message: 'Campaign not found',
        });
      }

      const campaign = await Campaign.update(req.params.id, req.body);

      // Log action
      await AuditLog.create(req.user.id, 'UPDATE', 'campaign', campaign.id, JSON.stringify(existingCampaign), JSON.stringify(campaign), req.ip, req.get('user-agent'));

      res.status(200).json({
        success: true,
        message: 'Campaign updated successfully',
        data: campaign,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete campaign
  delete: async (req, res, next) => {
    try {
      const campaign = await Campaign.findById(req.params.id);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          message: 'Campaign not found',
        });
      }

      await Campaign.delete(req.params.id);

      // Log action
      await AuditLog.create(req.user.id, 'DELETE', 'campaign', req.params.id, JSON.stringify(campaign), null, req.ip, req.get('user-agent'));

      res.status(200).json({
        success: true,
        message: 'Campaign deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = campaignController;
