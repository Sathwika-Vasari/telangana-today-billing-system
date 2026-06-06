const pool = require('../config/database');

class Payment {
  static async create(data, userId) {
    const result = await pool.query(
      `INSERT INTO payments (campaign_id, amount, payment_date, payment_method, reference_number, status, notes, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [data.campaign_id, data.amount, data.payment_date, data.payment_method, data.reference_number, data.status || 'pending', data.notes, userId]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT p.*, c.name as campaign_name, c.billing_amount FROM payments p JOIN campaigns c ON p.campaign_id = c.id WHERE p.id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getAll(limit = 10, offset = 0, filters = {}) {
    let query = 'SELECT p.*, c.name as campaign_name, a.name as advertiser_name FROM payments p JOIN campaigns c ON p.campaign_id = c.id JOIN advertisers a ON c.advertiser_id = a.id WHERE 1=1';
    const values = [];

    if (filters.status) {
      values.push(filters.status);
      query += ` AND p.status = $${values.length}`;
    }

    if (filters.campaign_id) {
      values.push(filters.campaign_id);
      query += ` AND p.campaign_id = $${values.length}`;
    }

    query += ' ORDER BY p.created_at DESC';
    values.push(limit);
    values.push(offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

    const result = await pool.query(query, values);

    const countQuery = 'SELECT COUNT(*) FROM payments p WHERE 1=1' + query.substring(query.indexOf('WHERE') + 5, query.indexOf('ORDER'));
    const countResult = await pool.query(countQuery, values.slice(0, -2));

    return {
      payments: result.rows,
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
    const query = `UPDATE payments SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramCount} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getPendingAmount() {
    const result = await pool.query(
      'SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status IN (\'pending\', \'overdue\')'
    );
    return parseFloat(result.rows[0].total);
  }

  static async getPaidAmount() {
    const result = await pool.query(
      'SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status = \'paid\''
    );
    return parseFloat(result.rows[0].total);
  }

  static async getCampaignPaymentSummary(campaignId) {
    const result = await pool.query(
      `SELECT * FROM campaign_payment_summary WHERE campaign_id = $1`,
      [campaignId]
    );
    return result.rows[0];
  }

  static async getOverduePayments() {
    const result = await pool.query(
      `SELECT p.*, c.name as campaign_name, a.name as advertiser_name FROM payments p
       JOIN campaigns c ON p.campaign_id = c.id
       JOIN advertisers a ON c.advertiser_id = a.id
       WHERE p.status = 'overdue' OR (p.status = 'pending' AND p.payment_date < CURRENT_DATE)`
    );
    return result.rows;
  }
}

module.exports = Payment;
