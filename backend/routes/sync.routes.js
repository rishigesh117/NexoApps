/**
 * Cloud Sync Routes
 * NexoApps Platform - Phase 5C
 */

const express = require('express');
const router = express.Router();
const syncController = require('../controllers/sync.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.post('/start', optionalAuthToken, syncController.startSync);
router.get('/status', optionalAuthToken, syncController.getSyncStatus);
router.get('/history', optionalAuthToken, syncController.getSyncHistory);

module.exports = router;
