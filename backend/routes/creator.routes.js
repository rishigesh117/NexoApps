/**
 * Creator Routes
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

const express = require('express');
const router = express.Router();
const creatorController = require('../controllers/creator.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, creatorController.getCreators);
router.get('/payouts', optionalAuthToken, creatorController.getPayouts);
router.get('/:username', optionalAuthToken, creatorController.getCreatorByUsername);

module.exports = router;
