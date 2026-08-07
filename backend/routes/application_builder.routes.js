/**
 * Application Builder Routes — NexoApps Phase 9B
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const applicationBuilderController = require('../controllers/application_builder.controller');

router.get('/', optionalAuthToken, applicationBuilderController.listApplications);
router.post('/', optionalAuthToken, applicationBuilderController.createApplication);
router.get('/analytics', optionalAuthToken, applicationBuilderController.getAnalytics);
router.get('/:id', optionalAuthToken, applicationBuilderController.getApplicationById);
router.post('/:id/components', optionalAuthToken, applicationBuilderController.addComponent);

module.exports = router;
