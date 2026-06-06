const pool = require('../config/database');

class AuditLog {
  static async create(userId, action, entityType, entityId, oldValue, newValue, ipAddress, userAgent) {
    const result = await pool.query(
      `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_value, new_value, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [userId, action, entityType, entityId, oldValue, newValue, ipAddress, userAgent]
    );
    return result.rows[0];
  }

  static async getByEntity(entityType, entityId) {
    const result = await pool.query(
      `SELECT * FROM audit_logs WHERE entity_type = $1 AND entity_id = $2 ORDER BY created_at DESC`,
      [entityType, entityId]
    );
    return result.rows;
  }

  static async getByUser(userId, limit = 50) {
    const result = await pool.query(
      `SELECT * FROM audit_logs WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2`,
      [userId, limit]
    );
    return result.rows;
  }

  static async getAll(limit = 100, offset = 0) {
    const result = await pool.query(
      `SELECT al.*, u.name as user_name FROM audit_logs al
       JOIN users u ON al.user_id = u.id
       ORDER BY al.created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }
}

module.exports = AuditLog;
