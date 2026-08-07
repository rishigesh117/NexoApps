/**
 * Publisher Controller — NexoApps Phase 9C
 */

const publisherService = require('../services/publisher.service');

const publisherController = {
  async getPublisherDashboard(req, res) {
    try {
      const userId = req.user?.id || req.query.userId || 'user-owner';
      const pub = await publisherService.getPublisherByUserId(userId);
      res.json({ success: true, data: pub });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listPublishers(req, res) {
    try {
      const publishers = await publisherService.listPublishers();
      res.json({ success: true, data: publishers });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async verifyPublisher(req, res) {
    try {
      const pub = await publisherService.verifyPublisher(req.params.id);
      res.json({ success: true, data: pub });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = publisherController;
