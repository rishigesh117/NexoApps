/**
 * Dashboard Routes
 * NexoApps Platform - Phase 3E
 */

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authenticateToken = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/auth.middleware');

router.use(authenticateToken, requireAdmin);

router.get('/dashboard', dashboardController.getDashboardOverview);
router.get('/stats', dashboardController.getStats);
router.get('/activity', dashboardController.getActivity);

module.exports = router;
