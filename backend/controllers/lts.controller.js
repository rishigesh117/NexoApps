/**
 * LTS Controller — NexoApps Phase 7E
 */

const ltsService = require('../services/lts.service');

const ltsController = {
  async getHealthStatus(req, res) {
    try {
      const health = await ltsService.getHealthStatus();
      res.json({ success: true, data: health });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getSecurityAudit(req, res) {
    try {
      const summary = await ltsService.getSecurityAuditSummary();
      res.json({ success: true, data: summary });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getPerformanceMetrics(req, res) {
    try {
      const metrics = await ltsService.getPerformanceMetrics();
      res.json({ success: true, data: metrics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listSecurityEvents(req, res) {
    try {
      const events = await ltsService.listSecurityEvents(parseInt(req.query.limit || '20', 10));
      res.json({ success: true, data: events });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = ltsController;
