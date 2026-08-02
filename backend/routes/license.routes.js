/**
 * License Routes
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

const express = require('express');
const router = express.Router();
const licenseController = require('../controllers/license.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/:itemId', optionalAuthToken, licenseController.getLicense);

module.exports = router;
