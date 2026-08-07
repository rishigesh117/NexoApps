/**
 * Messaging Controller — NexoApps Phase 11D (v8.4)
 */

const messagingService = require('../services/messaging.service');

class MessagingController {
  async getChannelMessages(req, res) {
    try {
      const messages = await messagingService.getChannelMessages(req.params.channelId);
      res.json({ success: true, data: messages });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async sendChannelMessage(req, res) {
    try {
      const msg = await messagingService.sendChannelMessage(req.body);
      res.status(201).json({ success: true, data: msg });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getMessageThreads(req, res) {
    try {
      const threads = await messagingService.getMessageThreads(req.params.parentMessageId);
      res.json({ success: true, data: threads });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async sendThreadReply(req, res) {
    try {
      const thread = await messagingService.sendThreadReply(req.body);
      res.status(201).json({ success: true, data: thread });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getDirectMessages(req, res) {
    try {
      const { senderId, recipientId } = req.query;
      const dms = await messagingService.getDirectMessages(senderId, recipientId);
      res.json({ success: true, data: dms });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async sendDirectMessage(req, res) {
    try {
      const dm = await messagingService.sendDirectMessage(req.body);
      res.status(201).json({ success: true, data: dm });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new MessagingController();
