/**
 * Governance Routes — NexoApps Phase 8E
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const governanceController = require('../controllers/governance.controller');

router.get('/policies', optionalAuthToken, governanceController.listPolicies);
router.get('/compliance-logs', optionalAuthToken, governanceController.getComplianceLogs);

module.exports = router;
