/**
 * Planner Routes
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/planner.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/projects', optionalAuthToken, plannerController.getPlans);
router.post('/projects', optionalAuthToken, plannerController.createPlan);

module.exports = router;
