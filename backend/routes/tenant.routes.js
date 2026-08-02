/**
 * Tenant Routes
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, tenantController.getTenants);
router.post('/', optionalAuthToken, tenantController.createTenant);
router.get('/:tenantId/branding', optionalAuthToken, tenantController.getBranding);
router.get('/:tenantId/domains', optionalAuthToken, tenantController.getDomains);

module.exports = router;
