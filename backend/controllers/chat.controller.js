/**
 * Chat Controller — NexoApps Phase 9A
 */

const chatService = require('../services/chat.service');

const chatController = {
  async listSessions(req, res) {
    try {
      const userId = req.user?.id || req.query.userId;
      const sessions = await chatService.listSessions(userId);
      res.json({ success: true, data: sessions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createSession(req, res) {
    try {
      const session = await chatService.createSession({
        ...req.body,
        userId: req.user?.id || req.body.userId
      });
      res.status(201).json({ success: true, data: session });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getSessionMessages(req, res) {
    try {
      const messages = await chatService.getSessionMessages(req.params.sessionId);
      res.json({ success: true, data: messages });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async sendMessage(req, res) {
    try {
      const result = await chatService.sendMessage(req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = chatController;
