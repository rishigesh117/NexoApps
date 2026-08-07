/**
 * Maintenance Controller — NexoApps Phase 10E (v8.0)
 */

const maintenanceService = require('../services/maintenance.service');
const enterpriseSupportService = require('../services/enterprise_support.service');

class MaintenanceController {
  async getWindows(req, res) {
    try {
      const windows = await maintenanceService.getWindows();
      res.json({ success: true, data: windows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getTickets(req, res) {
    try {
      const tickets = await enterpriseSupportService.getTickets();
      res.json({ success: true, data: tickets });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new MaintenanceController();
