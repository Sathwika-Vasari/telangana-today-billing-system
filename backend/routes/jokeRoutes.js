// Backend Route: routes/jokeRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jokeController = require('../controllers/jokeController');

// Public routes
router.get('/random', jokeController.getRandomJoke);
router.get('/category/:category', jokeController.getJokeByCategory);
router.get('/type/:type', jokeController.getJokeByType);

// Protected routes - Favorites
router.post('/favorites', auth, jokeController.saveFavoriteJoke);
router.get('/favorites', auth, jokeController.getFavoriteJokes);
router.delete('/favorites/:id', auth, jokeController.deleteFavoriteJoke);
router.get('/favorites/:id', auth, jokeController.getFavoriteJokeById);

module.exports = router;
