/**
 * Universal Search Routes
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

const express = require('express');
const router = express.Router();
const platformSearchController = require('../controllers/platform_search.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, platformSearchController.search);

module.exports = router;
