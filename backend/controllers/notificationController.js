const Notification = require('../models/Notification');
const AuditLog = require('../models/AuditLog');

const notificationController = {
  // Get user notifications
  getUserNotifications: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const notifications = await Notification.getUserNotifications(req.user.id, limit, offset);
      const unreadCount = await Notification.getUnreadCount(req.user.id);

      res.status(200).json({
        success: true,
        message: 'Notifications retrieved successfully',
        data: notifications,
        unread_count: unreadCount,
      });
    } catch (error) {
      next(error);
    }
  },

  // Mark notification as read
  markAsRead: async (req, res, next) => {
    try {
      const notification = await Notification.markAsRead(req.params.id);
      if (!notification) {
        return res.status(404).json({
          success: false,
          message: 'Notification not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Notification marked as read',
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  },

  // Mark all as read
  markAllAsRead: async (req, res, next) => {
    try {
      const notifications = await Notification.markAllAsRead(req.user.id);

      res.status(200).json({
        success: true,
        message: 'All notifications marked as read',
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = notificationController;
