/**
 * Automation Center Routes — NexoApps Phase 8D
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const automationCenterController = require('../controllers/automation_center.controller');

router.get('/templates', optionalAuthToken, automationCenterController.listTemplates);
router.post('/deploy/:id', optionalAuthToken, automationCenterController.deployTemplate);

module.exports = router;
