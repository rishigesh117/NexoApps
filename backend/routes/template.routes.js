/**
 * Template Routes
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, templateController.getTemplates);

module.exports = router;
