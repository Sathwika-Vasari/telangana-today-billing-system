// Backend Controller: controllers/jokeController.js

const db = require('../db');
const { query } = require('express-validator');

// Get random joke (proxied from external API)
exports.getRandomJoke = async (req, res) => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke', details: error.message });
  }
};

// Get joke by category
exports.getJokeByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = ['General', 'Knock-Knock', 'Programming', 'Miscellaneous'];

    if (!validCategories.includes(category) && category !== 'Any') {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke', details: error.message });
  }
};

// Get joke by type (single or twopart)
exports.getJokeByType = async (req, res) => {
  try {
    const { type } = req.params;
    const validTypes = ['single', 'twopart'];

    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid type. Use: single or twopart' });
    }

    const response = await fetch(`https://v2.jokeapi.dev/joke/Any?type=${type}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke', details: error.message });
  }
};

// Save favorite joke
exports.saveFavoriteJoke = async (req, res) => {
  try {
    const { category, type, joke_text, setup, delivery } = req.body;
    const userId = req.user.id;

    if (!category || !type) {
      return res.status(400).json({ error: 'Category and type are required' });
    }

    const query = `
      INSERT INTO favorite_jokes (user_id, category, type, joke_text, setup, delivery, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(
      query,
      [userId, category, type, joke_text || null, setup || null, delivery || null],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to save favorite joke' });
        }
        res.json({
          success: true,
          message: 'Joke saved to favorites',
          id: results.insertId,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get favorite jokes
exports.getFavoriteJokes = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const countQuery = 'SELECT COUNT(*) as total FROM favorite_jokes WHERE user_id = ?';
    const dataQuery = `
      SELECT * FROM favorite_jokes
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    db.query(countQuery, [userId], (error, countResults) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to fetch favorite jokes' });
      }

      const total = countResults[0].total;
      const pages = Math.ceil(total / limit);

      db.query(dataQuery, [userId, limit, offset], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to fetch favorite jokes' });
        }

        res.json({
          data: results,
          pagination: {
            current: page,
            pages,
            total,
            limit,
          },
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get single favorite joke
exports.getFavoriteJokeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const query = 'SELECT * FROM favorite_jokes WHERE id = ? AND user_id = ?';

    db.query(query, [id, userId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to fetch favorite joke' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Favorite joke not found' });
      }

      res.json(results[0]);
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Delete favorite joke
exports.deleteFavoriteJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const query = 'DELETE FROM favorite_jokes WHERE id = ? AND user_id = ?';

    db.query(query, [id, userId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to delete favorite joke' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Favorite joke not found' });
      }

      res.json({ success: true, message: 'Favorite joke deleted' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
