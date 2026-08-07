/**
 * Chat Routes — NexoApps Phase 9A
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const chatController = require('../controllers/chat.controller');

router.get('/sessions', optionalAuthToken, chatController.listSessions);
router.post('/sessions', optionalAuthToken, chatController.createSession);
router.get('/sessions/:sessionId/messages', optionalAuthToken, chatController.getSessionMessages);
router.post('/messages', optionalAuthToken, chatController.sendMessage);

module.exports = router;
