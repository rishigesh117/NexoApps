/**
 * Agent Metrics Routes — NexoApps Phase 8A
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const agentMetricsController = require('../controllers/agent_metrics.controller');

router.get('/:agentId', optionalAuthToken, agentMetricsController.getMetrics);
router.get('/telemetry/:workspaceId', optionalAuthToken, agentMetricsController.getWorkspaceTelemetry);

module.exports = router;
