/**
 * Reasoning Routes — NexoApps Phase 8E
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const reasoningController = require('../controllers/reasoning.controller');

router.get('/sessions', optionalAuthToken, reasoningController.listSessions);
router.post('/run', optionalAuthToken, reasoningController.runReasoning);

module.exports = router;
