/**
 * Support Ticket & Knowledge Base Routes
 * NexoApps Platform - Phase 5B
 */

const express = require('express');
const router = express.Router();
const supportController = require('../controllers/support.controller');
const { optionalAuthToken, authenticateToken } = require('../middleware/auth.middleware');

router.get('/tickets', optionalAuthToken, supportController.getTickets);
router.post('/tickets', optionalAuthToken, supportController.createTicket);
router.post('/tickets/:id/reply', optionalAuthToken, supportController.addReply);

router.get('/articles', supportController.getKnowledgeBase);
router.get('/faq', supportController.getFAQs);

module.exports = router;
