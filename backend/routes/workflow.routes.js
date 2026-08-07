/**
 * Workflow Routes
 * NexoApps Platform - Version 8.3 (Phase 11C)
 */

const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflow.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, workflowController.getWorkflows);
router.post('/', optionalAuthToken, workflowController.createWorkflow);

// Phase 7D Extensions
router.get('/templates', optionalAuthToken, workflowController.listTemplates);
router.get('/instances', optionalAuthToken, workflowController.listInstances);
router.get('/instances/:id', optionalAuthToken, workflowController.getInstance);
router.post('/instances', optionalAuthToken, workflowController.createInstance);
router.get('/instances/:id/steps', optionalAuthToken, workflowController.getSteps);
router.post('/instances/:id/run', optionalAuthToken, workflowController.runWorkflow);
router.get('/instances/:id/runs', optionalAuthToken, workflowController.listRuns);
router.get('/runs/:runId/logs', optionalAuthToken, workflowController.getLogs);

// Phase 11C Extensions
router.get('/enterprise', optionalAuthToken, workflowController.listEnterpriseWorkflows);
router.get('/enterprise/:id', optionalAuthToken, workflowController.getEnterpriseWorkflowById);
router.post('/enterprise', optionalAuthToken, workflowController.createEnterpriseWorkflow);
router.post('/enterprise/:id/publish', optionalAuthToken, workflowController.publishWorkflow);
router.get('/enterprise/:id/executions', optionalAuthToken, workflowController.getWorkflowExecutions);

module.exports = router;
