/**
 * Governance Controller — NexoApps Phase 8E
 */

const governanceService = require('../services/governance.service');
const complianceService = require('../services/compliance.service');

const governanceController = {
  async listPolicies(req, res) {
    try {
      const policies = await governanceService.listPolicies();
      res.json({ success: true, data: policies });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getComplianceLogs(req, res) {
    try {
      const logs = await complianceService.getComplianceLogs();
      res.json({ success: true, data: logs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = governanceController;
