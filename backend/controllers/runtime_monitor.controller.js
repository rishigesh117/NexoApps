/**
 * Runtime Monitor Controller — NexoApps Phase 8B
 */

const runtimeMonitorService = require('../services/runtime_monitor.service');
const runtimeSecurityService = require('../services/runtime_security.service');

const runtimeMonitorController = {
  async getMetrics(req, res) {
    try {
      const metrics = await runtimeMonitorService.getMetrics(req.params.instanceId || 'all');
      res.json({ success: true, data: metrics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getLogs(req, res) {
    try {
      const logs = await runtimeMonitorService.getLogs(req.params.instanceId || 'all');
      res.json({ success: true, data: logs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async verifyIsolationStatus(req, res) {
    try {
      const status = await runtimeSecurityService.verifyIsolationStatus(req.params.environmentId);
      res.json({ success: true, data: status });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = runtimeMonitorController;
