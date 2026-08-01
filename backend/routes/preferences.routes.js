/**
 * Preferences Routes
 * NexoApps Platform - Phase 5C
 */

const express = require('express');
const router = express.Router();
const preferencesController = require('../controllers/preferences.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, preferencesController.getPreferences);
router.patch('/', optionalAuthToken, preferencesController.updatePreferences);

module.exports = router;
