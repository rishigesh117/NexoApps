/**
 * Application Builder Controller — NexoApps Phase 9B
 */

const applicationBuilderService = require('../services/application_builder.service');
const builderAnalyticsService = require('../services/builder_analytics.service');

const applicationBuilderController = {
  async listApplications(req, res) {
    try {
      const ownerId = req.user?.id || req.query.ownerId;
      const apps = await applicationBuilderService.listApplications(ownerId);
      res.json({ success: true, data: apps });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getApplicationById(req, res) {
    try {
      const app = await applicationBuilderService.getApplicationById(req.params.id);
      if (!app) return res.status(404).json({ success: false, error: 'Application not found' });
      res.json({ success: true, data: app });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createApplication(req, res) {
    try {
      const app = await applicationBuilderService.createApplication({
        ...req.body,
        ownerId: req.user?.id || req.body.ownerId
      });
      res.status(201).json({ success: true, data: app });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async addComponent(req, res) {
    try {
      const comp = await applicationBuilderService.addComponent(req.params.id, req.body);
      res.status(201).json({ success: true, data: comp });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getAnalytics(req, res) {
    try {
      const analytics = await builderAnalyticsService.getMetrics();
      res.json({ success: true, data: analytics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = applicationBuilderController;
