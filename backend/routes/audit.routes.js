/**
 * Audit Log Routes
 * NexoApps Platform - Phase 5E (Version 2.0 EC1)
 */

const express = require('express');
const router = express.Router();
const auditController = require('../controllers/audit.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, auditController.getAuditLogs);

module.exports = router;
