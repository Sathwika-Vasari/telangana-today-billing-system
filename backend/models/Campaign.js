const pool = require('../config/database');

class Campaign {
  static async create(data, userId) {
    const result = await pool.query(
      `INSERT INTO campaigns (advertiser_id, name, ad_type, booking_date, start_date, end_date, billing_amount, status, renewal_date, description, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [data.advertiser_id, data.name, data.ad_type, data.booking_date, data.start_date, data.end_date, data.billing_amount, data.status || 'active', data.renewal_date, data.description, userId]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT c.*, a.name as advertiser_name FROM campaigns c JOIN advertisers a ON c.advertiser_id = a.id WHERE c.id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getAll(limit = 10, offset = 0, filters = {}) {
    let query = 'SELECT c.*, a.name as advertiser_name FROM campaigns c JOIN advertisers a ON c.advertiser_id = a.id WHERE 1=1';
    const values = [];

    if (filters.status) {
      values.push(filters.status);
      query += ` AND c.status = $${values.length}`;
    }

    if (filters.advertiser_id) {
      values.push(filters.advertiser_id);
      query += ` AND c.advertiser_id = $${values.length}`;
    }

    if (filters.search) {
      values.push(`%${filters.search}%`);
      query += ` AND c.name ILIKE $${values.length}`;
    }

    query += ' ORDER BY c.created_at DESC';
    values.push(limit);
    values.push(offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

    const result = await pool.query(query, values);

    const countQuery = 'SELECT COUNT(*) FROM campaigns c WHERE 1=1' + query.substring(query.indexOf('WHERE') + 5, query.indexOf('ORDER'));
    const countResult = await pool.query(countQuery, values.slice(0, -2));

    return {
      campaigns: result.rows,
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
    const query = `UPDATE campaigns SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramCount} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM campaigns WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }

  static async getUpcomingRenewals(days = 30) {
    const result = await pool.query(
      `SELECT c.*, a.name as advertiser_name FROM campaigns c
       JOIN advertisers a ON c.advertiser_id = a.id
       WHERE c.renewal_date IS NOT NULL
       AND c.renewal_date <= CURRENT_DATE + INTERVAL '${days} days'
       AND c.renewal_date >= CURRENT_DATE
       ORDER BY c.renewal_date ASC`
    );
    return result.rows;
  }

  static async getActiveCount() {
    const result = await pool.query(
      'SELECT COUNT(*) FROM campaigns WHERE status = \'active\''
    );
    return parseInt(result.rows[0].count);
  }

  static async getTotalBillingAmount() {
    const result = await pool.query(
      'SELECT COALESCE(SUM(billing_amount), 0) as total FROM campaigns'
    );
    return parseFloat(result.rows[0].total);
  }
}

module.exports = Campaign;
