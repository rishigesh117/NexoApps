/**
 * Monitoring Controller — NexoApps Phase 12A (v9.1)
 */

const monitoringService = require('../services/monitoring.service');
const healthService = require('../services/health.service');

class ProductionMonitoringController {
  async getAlerts(req, res) {
    try {
      const alerts = await monitoringService.getAlerts();
      const monitors = await monitoringService.getResourceMonitors();
      res.json({ success: true, data: { alerts, monitors } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getHealthChecks(req, res) {
    try {
      const health = await healthService.getHealthChecks();
      res.json({ success: true, data: health });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ProductionMonitoringController();
