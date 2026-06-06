const Advertiser = require('../models/Advertiser');
const AuditLog = require('../models/AuditLog');

const advertiserController = {
  // Get all advertisers
  getAll: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const filters = {
        status: req.query.status,
        search: req.query.search,
      };

      const { advertisers, total } = await Advertiser.getAll(limit, offset, filters);

      res.status(200).json({
        success: true,
        message: 'Advertisers retrieved successfully',
        data: advertisers,
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

  // Get single advertiser
  getById: async (req, res, next) => {
    try {
      const advertiser = await Advertiser.findById(req.params.id);
      if (!advertiser) {
        return res.status(404).json({
          success: false,
          message: 'Advertiser not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Advertiser retrieved successfully',
        data: advertiser,
      });
    } catch (error) {
      next(error);
    }
  },

  // Create advertiser
  create: async (req, res, next) => {
    try {
      const { name, email, phone, address, city, state, pincode, contact_person, status } = req.body;

      // Check if email already exists
      const emailExists = await Advertiser.checkEmail(email);
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists',
        });
      }

      const advertiser = await Advertiser.create(
        { name, email, phone, address, city, state, pincode, contact_person, status },
        req.user.id
      );

      // Log action
      await AuditLog.create(req.user.id, 'CREATE', 'advertiser', advertiser.id, null, JSON.stringify(advertiser), req.ip, req.get('user-agent'));

      res.status(201).json({
        success: true,
        message: 'Advertiser created successfully',
        data: advertiser,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update advertiser
  update: async (req, res, next) => {
    try {
      const existingAdvertiser = await Advertiser.findById(req.params.id);
      if (!existingAdvertiser) {
        return res.status(404).json({
          success: false,
          message: 'Advertiser not found',
        });
      }

      // Check if email already exists (if email is being updated)
      if (req.body.email && req.body.email !== existingAdvertiser.email) {
        const emailExists = await Advertiser.checkEmail(req.body.email, req.params.id);
        if (emailExists) {
          return res.status(409).json({
            success: false,
            message: 'Email already exists',
          });
        }
      }

      const advertiser = await Advertiser.update(req.params.id, req.body);

      // Log action
      await AuditLog.create(req.user.id, 'UPDATE', 'advertiser', advertiser.id, JSON.stringify(existingAdvertiser), JSON.stringify(advertiser), req.ip, req.get('user-agent'));

      res.status(200).json({
        success: true,
        message: 'Advertiser updated successfully',
        data: advertiser,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete advertiser
  delete: async (req, res, next) => {
    try {
      const advertiser = await Advertiser.findById(req.params.id);
      if (!advertiser) {
        return res.status(404).json({
          success: false,
          message: 'Advertiser not found',
        });
      }

      await Advertiser.delete(req.params.id);

      // Log action
      await AuditLog.create(req.user.id, 'DELETE', 'advertiser', req.params.id, JSON.stringify(advertiser), null, req.ip, req.get('user-agent'));

      res.status(200).json({
        success: true,
        message: 'Advertiser deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = advertiserController;
