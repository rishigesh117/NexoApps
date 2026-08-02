/**
 * Agent Execution Routes — NexoApps Phase 8A
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const agentExecutionController = require('../controllers/agent_execution.controller');

router.get('/executions/:agentId', optionalAuthToken, agentExecutionController.listExecutions);
router.post('/run/:agentId', optionalAuthToken, agentExecutionController.runExecution);
router.get('/tools', optionalAuthToken, agentExecutionController.listTools);
router.post('/invoke-tool/:agentId', optionalAuthToken, agentExecutionController.invokeTool);
router.get('/schedules/:agentId', optionalAuthToken, agentExecutionController.listSchedules);
router.post('/schedules', optionalAuthToken, agentExecutionController.createSchedule);

module.exports = router;
