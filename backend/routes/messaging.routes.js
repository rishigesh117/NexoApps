const express = require('express');
const router = express.Router();
const messagingController = require('../controllers/messaging.controller');

router.get('/channels/:channelId/messages', (req, res) => messagingController.getChannelMessages(req, res));
router.post('/channels/:channelId/messages', (req, res) => messagingController.sendChannelMessage(req, res));
router.get('/messages/:parentMessageId/threads', (req, res) => messagingController.getMessageThreads(req, res));
router.post('/messages/:parentMessageId/threads', (req, res) => messagingController.sendThreadReply(req, res));
router.get('/direct-messages', (req, res) => messagingController.getDirectMessages(req, res));
router.post('/direct-messages', (req, res) => messagingController.sendDirectMessage(req, res));

module.exports = router;
