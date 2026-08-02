/**
 * Workflow Routes
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflow.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, workflowController.getWorkflows);
router.post('/', optionalAuthToken, workflowController.createWorkflow);

module.exports = router;
