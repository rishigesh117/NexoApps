/**
 * Platform Automation Routes
 * NexoApps Platform - Phase 5B
 */

const express = require('express');
const router = express.Router();
const automationController = require('../controllers/automation.controller');
const { authenticateToken, requireAdmin } = require('../middleware/auth.middleware');

router.use(authenticateToken, requireAdmin);

router.get('/logs', automationController.getLogs);
router.get('/report', automationController.getAuditReport);

module.exports = router;
