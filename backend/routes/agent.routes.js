/**
 * AI Agent Routes
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, agentController.getAgents);
router.get('/:id', optionalAuthToken, agentController.getAgentById);
router.post('/:id/chat', optionalAuthToken, agentController.chatWithAgent);

module.exports = router;
