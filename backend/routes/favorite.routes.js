/**
 * Favorite & Wishlist Routes
 * NexoApps Platform - Phase 3D
 */

const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const authenticateToken = require('../middleware/auth.middleware');
const { optionalAuthToken } = require('../middleware/auth.middleware');

// User favorites history
router.get('/', authenticateToken, favoriteController.getUserFavorites);

// Favorite app management
router.get('/apps/:slug/favorite', optionalAuthToken, favoriteController.checkFavoriteStatus);
router.post('/apps/:slug/favorite', authenticateToken, favoriteController.addFavorite);
router.delete('/apps/:slug/favorite', authenticateToken, favoriteController.removeFavorite);

module.exports = router;
