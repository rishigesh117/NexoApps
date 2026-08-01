/**
 * Cloud Sync Routes
 * NexoApps Platform - Phase 5C
 */

const express = require('express');
const router = express.Router();
const syncController = require('../controllers/sync.controller');

router.post('/start', syncController.startSync);
router.get('/status', syncController.getSyncStatus);
router.get('/history', syncController.getSyncHistory);

module.exports = router;
