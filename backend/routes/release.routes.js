/**
 * Release Routes — NexoApps Phase 8E
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const releaseController = require('../controllers/release.controller');

router.get('/info', optionalAuthToken, releaseController.getReleaseInformation);

module.exports = router;
