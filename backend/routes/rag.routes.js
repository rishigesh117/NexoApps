/**
 * RAG Routes — NexoApps Phase 8C
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const ragController = require('../controllers/rag.controller');

router.get('/sessions/:knowledgeBaseId', optionalAuthToken, ragController.listSessions);
router.post('/sessions/:sessionId/ask', optionalAuthToken, ragController.askQuestion);

module.exports = router;
