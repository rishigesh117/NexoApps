/**
 * ModelOps Controller — NexoApps Phase 11B (v8.2)
 */

const modelopsDashboardService = require('../services/modelops_dashboard.service');
const modelMonitorService = require('../services/model_monitor.service');
const driftDetectionService = require('../services/drift_detection.service');

class ModelOpsController {
  async getOverview(req, res) {
    try {
      const overview = await modelopsDashboardService.getOverview();
      res.json({ success: true, data: overview });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getMonitoring(req, res) {
    try {
      const monitoring = await modelMonitorService.getMonitoring();
      res.json({ success: true, data: monitoring });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getDriftReports(req, res) {
    try {
      const reports = await driftDetectionService.getReports();
      res.json({ success: true, data: reports });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ModelOpsController();
