/**
 * AI Assistant Routes
 * NexoApps Platform - Phase 5B
 */

const express = require('express');
const router = express.Router();
const assistantController = require('../controllers/assistant.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/history', optionalAuthToken, assistantController.getChatHistory);
router.post('/chat', optionalAuthToken, assistantController.sendMessage);

module.exports = router;
