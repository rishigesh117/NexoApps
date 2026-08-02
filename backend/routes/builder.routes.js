/**
 * AI Builder Routes
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

const express = require('express');
const router = express.Router();
const builderController = require('../controllers/builder.controller');
const templateController = require('../controllers/template.controller');
const workflowController = require('../controllers/workflow.controller');
const exportController = require('../controllers/export.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/projects', optionalAuthToken, builderController.getProjects);
router.post('/project', optionalAuthToken, builderController.createProject);
router.get('/project/:id', optionalAuthToken, builderController.getProjectById);
router.get('/history', optionalAuthToken, builderController.getPromptHistory);

router.get('/templates', optionalAuthToken, templateController.getTemplates);

router.get('/workflows', optionalAuthToken, workflowController.getWorkflows);
router.post('/workflow', optionalAuthToken, workflowController.createWorkflow);

router.post('/export', optionalAuthToken, exportController.createExportPackage);

module.exports = router;
