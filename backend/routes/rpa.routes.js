/**
 * RPA Routes — NexoApps Phase 11C
 * Version 8.3
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const rpaController = require('../controllers/rpa.controller');

router.get('/bots', optionalAuthToken, rpaController.listBots);
router.post('/bots', optionalAuthToken, rpaController.createBot);
router.get('/bots/:botId/jobs', optionalAuthToken, rpaController.listJobs);
router.post('/bots/:botId/trigger', optionalAuthToken, rpaController.triggerJob);

module.exports = router;
