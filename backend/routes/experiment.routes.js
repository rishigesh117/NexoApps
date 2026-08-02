/**
 * Experiment Routes
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

const express = require('express');
const router = express.Router();
const experimentController = require('../controllers/experiment.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, experimentController.getExperiments);

module.exports = router;
