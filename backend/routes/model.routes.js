/**
 * AI Model Routes
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

const express = require('express');
const router = express.Router();
const modelController = require('../controllers/model.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, modelController.getModels);
router.post('/', optionalAuthToken, modelController.registerModel);

module.exports = router;
