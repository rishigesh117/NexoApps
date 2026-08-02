/**
 * Developer API Routes
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

const express = require('express');
const router = express.Router();
const developerApiController = require('../controllers/developer_api.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/keys', optionalAuthToken, developerApiController.getKeys);
router.get('/docs', optionalAuthToken, developerApiController.getDocs);
router.get('/sdks', optionalAuthToken, developerApiController.getSdks);

module.exports = router;
