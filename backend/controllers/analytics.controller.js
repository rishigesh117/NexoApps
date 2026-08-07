/**
 * Analytics Controller — NexoApps Phase 10C
 */

const analyticsEngineService = require('../services/analytics_engine.service');
const predictiveAnalyticsService = require('../services/predictive_analytics.service');

class AnalyticsController {
  async getMetrics(req, res) {
    try {
      const metrics = await analyticsEngineService.getMetrics();
      res.json({ success: true, data: metrics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getPredictiveModels(req, res) {
    try {
      const models = await predictiveAnalyticsService.getModels();
      res.json({ success: true, data: models });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new AnalyticsController();
