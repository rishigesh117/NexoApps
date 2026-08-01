/**
 * Favorite Controller Layer
 * NexoApps Platform - Phase 3D
 */

const favoriteService = require('../services/favorite.service');

class FavoriteController {
  // GET /api/v1/favorites
  getUserFavorites(req, res) {
    try {
      const userId = req.user.id;
      const favorites = favoriteService.getUserFavorites(userId);

      return res.status(200).json({
        success: true,
        data: favorites,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/v1/apps/:slug/favorite
  checkFavoriteStatus(req, res) {
    try {
      const { slug } = req.params;
      const userId = req.user ? req.user.id : null;
      const isFavorite = favoriteService.checkIsFavorite(userId, slug);

      return res.status(200).json({
        success: true,
        data: { isFavorite },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // POST /api/v1/apps/:slug/favorite
  addFavorite(req, res) {
    try {
      const { slug } = req.params;
      const userId = req.user.id;

      const result = favoriteService.addFavorite(userId, slug);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.favorite,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // DELETE /api/v1/apps/:slug/favorite
  removeFavorite(req, res) {
    try {
      const { slug } = req.params;
      const userId = req.user.id;

      const result = favoriteService.removeFavorite(userId, slug);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new FavoriteController();
