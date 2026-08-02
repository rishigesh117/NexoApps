/**
 * Review Routes
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, reviewController.getReviews);
router.post('/', optionalAuthToken, reviewController.createReview);
router.get('/docs', optionalAuthToken, reviewController.getDocs);
router.post('/docs', optionalAuthToken, reviewController.generateDoc);

module.exports = router;
