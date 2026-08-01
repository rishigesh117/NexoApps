/**
 * Review Routes
 * NexoApps Platform - Phase 3D
 */

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authenticateToken = require('../middleware/auth.middleware');
const { optionalAuthToken } = require('../middleware/auth.middleware');

// Public route with optional auth context
router.get('/apps/:slug/reviews', optionalAuthToken, reviewController.getAppReviews);

// Protected routes (User authentication required)
router.post('/apps/:slug/reviews', authenticateToken, reviewController.createReview);
router.patch('/:id', authenticateToken, reviewController.updateReview);
router.delete('/:id', authenticateToken, reviewController.deleteReview);
router.post('/:id/like', authenticateToken, reviewController.toggleLike);

// User profile review history
router.get('/user/me', authenticateToken, reviewController.getUserReviews);

module.exports = router;
