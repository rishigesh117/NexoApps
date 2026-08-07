/**
 * Application Template Routes — NexoApps Phase 9B
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const applicationTemplateController = require('../controllers/application_template.controller');

router.get('/', optionalAuthToken, applicationTemplateController.listTemplates);
router.post('/', optionalAuthToken, applicationTemplateController.createTemplate);
router.get('/:id', optionalAuthToken, applicationTemplateController.getTemplateById);

module.exports = router;
