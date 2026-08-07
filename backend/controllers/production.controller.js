/**
 * Production Controller — NexoApps Phase 12A (v9.1)
 */

const dashboardService = require('../services/production_dashboard.service');
const performanceService = require('../services/performance.service');
const autoscalingService = require('../services/autoscaling.service');
const discoveryService = require('../services/service_discovery.service');

class ProductionController {
  async getOverview(req, res) {
    try {
      const data = await dashboardService.getOverview();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getPerformance(req, res) {
    try {
      const data = await performanceService.getPerformanceMetrics();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAutoscaling(req, res) {
    try {
      const data = await autoscalingService.getPolicies();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getServiceDiscovery(req, res) {
    try {
      const data = await discoveryService.getDiscoveredServices();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ProductionController();
