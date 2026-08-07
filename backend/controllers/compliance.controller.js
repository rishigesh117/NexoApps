/**
 * Compliance Controller — NexoApps Phase 10D
 */

const complianceService = require('../services/compliance.service');
const auditService = require('../services/audit.service');

class ComplianceController {
  async getFrameworks(req, res) {
    try {
      const frameworks = await complianceService.getFrameworks();
      res.json({ success: true, data: frameworks });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAuditLogs(req, res) {
    try {
      const logs = await auditService.getAuditLogs();
      res.json({ success: true, data: logs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ComplianceController();
