const pool = require('../config/database');

class Advertiser {
  static async create(data, userId) {
    const result = await pool.query(
      `INSERT INTO advertisers (name, email, phone, address, city, state, pincode, contact_person, status, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [data.name, data.email, data.phone, data.address, data.city, data.state, data.pincode, data.contact_person, data.status || 'active', userId]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM advertisers WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getAll(limit = 10, offset = 0, filters = {}) {
    let query = 'SELECT * FROM advertisers WHERE 1=1';
    const values = [];

    if (filters.status) {
      values.push(filters.status);
      query += ` AND status = $${values.length}`;
    }

    if (filters.search) {
      values.push(`%${filters.search}%`);
      query += ` AND (name ILIKE $${values.length} OR email ILIKE $${values.length} OR phone ILIKE $${values.length})`;
    }

    query += ' ORDER BY created_at DESC';
    values.push(limit);
    values.push(offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

    const result = await pool.query(query, values);

    const countQuery = 'SELECT COUNT(*) FROM advertisers WHERE 1=1' + query.substring(query.indexOf('WHERE') + 5, query.indexOf('ORDER'));
    const countResult = await pool.query(countQuery, values.slice(0, -2));

    return {
      advertisers: result.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    values.push(id);
    const query = `UPDATE advertisers SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramCount} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM advertisers WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }

  static async getSummary(id) {
    const result = await pool.query(
      'SELECT * FROM advertiser_summary WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async checkEmail(email, excludeId = null) {
    let query = 'SELECT COUNT(*) FROM advertisers WHERE email = $1';
    const values = [email];

    if (excludeId) {
      query += ` AND id != $2`;
      values.push(excludeId);
    }

    const result = await pool.query(query, values);
    return parseInt(result.rows[0].count) > 0;
  }
}

module.exports = Advertiser;
