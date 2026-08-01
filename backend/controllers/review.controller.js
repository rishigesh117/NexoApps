/**
 * Review Controller Layer
 * NexoApps Platform - Phase 3D
 */

const reviewService = require('../services/review.service');

class ReviewController {
  // GET /api/v1/apps/:slug/reviews
  getAppReviews(req, res) {
    try {
      const { slug } = req.params;
      const { rating, verifiedOnly, sort, search, page, limit } = req.query;
      const currentUserId = req.user ? req.user.id : null;

      const result = reviewService.getReviewsByAppSlug(slug, {
        rating,
        verifiedOnly,
        sort,
        search,
        currentUserId,
        page,
        limit,
      });

      const stats = reviewService.getRatingDistribution(slug);

      return res.status(200).json({
        success: true,
        data: {
          reviews: result.reviews,
          stats,
          pagination: {
            total: result.total,
            page: result.page,
            limit: result.limit,
          },
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // POST /api/v1/apps/:slug/reviews
  createReview(req, res) {
    try {
      const { slug } = req.params;
      const userId = req.user.id;
      const userName = req.user.username || req.user.name;
      const userAvatar = req.user.profileImage || req.user.avatarUrl;

      const review = reviewService.createReview(
        userId,
        userName,
        userAvatar,
        slug,
        req.body
      );

      return res.status(201).json({
        success: true,
        message: 'Review posted successfully!',
        data: review,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // PATCH /api/v1/reviews/:id
  updateReview(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const updated = reviewService.updateReview(userId, id, req.body);

      return res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        data: updated,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // DELETE /api/v1/reviews/:id
  deleteReview(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = reviewService.deleteReview(userId, id);

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

  // POST /api/v1/reviews/:id/like
  toggleLike(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = reviewService.toggleLikeReview(userId, id);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/v1/users/me/reviews
  getUserReviews(req, res) {
    try {
      const userId = req.user.id;
      const reviews = reviewService.getUserReviews(userId);

      return res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new ReviewController();
