/**
 * Community Routes
 * NexoApps Platform - Phase 4D
 */

const express = require('express');
const router = express.Router();
const communityController = require('../controllers/community.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/trending', optionalAuthToken, communityController.getTrending);
router.get('/latest', optionalAuthToken, communityController.getLatest);
router.get('/recommended', optionalAuthToken, communityController.getRecommended);
router.get('/editors-choice', optionalAuthToken, communityController.getEditorsChoice);
router.get('/feed', optionalAuthToken, communityController.getFeed);

module.exports = router;
