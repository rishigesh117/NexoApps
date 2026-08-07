/**
 * Security Controller — NexoApps Phase 10D
 */

const siemService = require('../services/siem.service');
const threatDetectionService = require('../services/threat_detection.service');
const vulnerabilityService = require('../services/vulnerability.service');
const securityPolicyService = require('../services/security_policy.service');

class SecurityController {
  async getSiemSummary(req, res) {
    try {
      const summary = await siemService.getSummary();
      res.json({ success: true, data: summary });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getThreats(req, res) {
    try {
      const threats = await threatDetectionService.getThreats();
      res.json({ success: true, data: threats });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getVulnerabilities(req, res) {
    try {
      const vulns = await vulnerabilityService.getVulnerabilities();
      res.json({ success: true, data: vulns });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getPolicies(req, res) {
    try {
      const policies = await securityPolicyService.getPolicies();
      res.json({ success: true, data: policies });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new SecurityController();
