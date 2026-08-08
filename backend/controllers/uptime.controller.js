/**
 * Uptime Controller — NexoApps Phase 12C (v9.3)
 */

const uptimeService = require('../services/uptime.service');
const syntheticMonitorService = require('../services/synthetic_monitor.service');

class UptimeController {
  async getChecks(req, res) {
    try {
      const checks = await uptimeService.getUptimeChecks();
      const stats = await uptimeService.getUptimeStats();
      res.json({ success: true, data: { checks, stats } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createCheck(req, res) {
    try {
      const { checkName, targetUrl } = req.body;
      if (!checkName || !targetUrl) {
        return res.status(400).json({ success: false, error: 'checkName and targetUrl are required' });
      }
      const check = await uptimeService.createUptimeCheck(req.body);
      res.status(201).json({ success: true, data: check });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getSyntheticMonitors(req, res) {
    try {
      const monitors = await syntheticMonitorService.getMonitors();
      res.json({ success: true, data: monitors });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createSyntheticMonitor(req, res) {
    try {
      const { monitorName } = req.body;
      if (!monitorName) {
        return res.status(400).json({ success: false, error: 'monitorName is required' });
      }
      const monitor = await syntheticMonitorService.createMonitor(req.body);
      res.status(201).json({ success: true, data: monitor });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new UptimeController();
