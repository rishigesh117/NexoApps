/**
 * Sprint Routes
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

const express = require('express');
const router = express.Router();
const sprintController = require('../controllers/sprint.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, sprintController.getSprints);

module.exports = router;
