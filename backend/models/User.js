const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(email, password, name, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, created_at',
      [email, hashedPassword, name, role]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT id, email, name, role, is_active, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getAll(limit = 10, offset = 0) {
    const result = await pool.query(
      'SELECT id, email, name, role, is_active, created_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    const countResult = await pool.query('SELECT COUNT(*) FROM users');
    return {
      users: result.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
