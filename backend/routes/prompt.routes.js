/**
 * Prompt Routes — NexoApps Phase 9A
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const promptController = require('../controllers/prompt.controller');

router.get('/templates', optionalAuthToken, promptController.listTemplates);
router.post('/templates', optionalAuthToken, promptController.createTemplate);
router.get('/templates/:id', optionalAuthToken, promptController.getTemplateById);
router.post('/templates/:id/versions', optionalAuthToken, promptController.addVersion);

module.exports = router;
