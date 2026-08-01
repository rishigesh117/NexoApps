/**
 * Search Routes
 * NexoApps Platform - Phase 5A
 */

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, searchController.globalSearch);
router.get('/recommendations', optionalAuthToken, searchController.getRecommendations);
router.get('/popular', searchController.getPopularSearches);

module.exports = router;
