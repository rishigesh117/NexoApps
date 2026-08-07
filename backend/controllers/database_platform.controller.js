/**
 * Database Platform Controller — NexoApps Phase 12B (v9.2)
 */

const dashboardService = require('../services/database_dashboard.service');
const clusterService = require('../services/database_cluster.service');
const healthService = require('../services/database_health.service');
const optimizerService = require('../services/query_optimizer.service');
const drService = require('../services/disaster_recovery.service');

class DatabasePlatformController {
  async getOverview(req, res) {
    try {
      const data = await dashboardService.getOverview();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getClusters(req, res) {
    try {
      const clusters = await clusterService.getClusters();
      const nodes = await clusterService.getNodes();
      res.json({ success: true, data: { clusters, nodes } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getHealth(req, res) {
    try {
      const health = await healthService.getHealthData();
      res.json({ success: true, data: health });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getQueryAnalytics(req, res) {
    try {
      const stats = await optimizerService.getQueryStatistics();
      res.json({ success: true, data: stats });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getDisasterRecovery(req, res) {
    try {
      const sites = await drService.getDRSites();
      res.json({ success: true, data: sites });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new DatabasePlatformController();
