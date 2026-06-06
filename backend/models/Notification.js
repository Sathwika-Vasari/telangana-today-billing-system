const pool = require('../config/database');

class Notification {
  static async create(userId, campaignId, type, title, message) {
    const result = await pool.query(
      `INSERT INTO notifications (user_id, campaign_id, type, title, message, is_read)
       VALUES ($1, $2, $3, $4, $5, false)
       RETURNING *`,
      [userId, campaignId, type, title, message]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getUserNotifications(userId, limit = 20, offset = 0) {
    const result = await pool.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );
    return result.rows;
  }

  static async getUnreadCount(userId) {
    const result = await pool.query(
      'SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND is_read = false',
      [userId]
    );
    return parseInt(result.rows[0].count);
  }

  static async markAsRead(id) {
    const result = await pool.query(
      'UPDATE notifications SET is_read = true, read_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async markAllAsRead(userId) {
    const result = await pool.query(
      'UPDATE notifications SET is_read = true, read_at = CURRENT_TIMESTAMP WHERE user_id = $1 AND is_read = false RETURNING *',
      [userId]
    );
    return result.rows;
  }

  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM notifications WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Notification;
