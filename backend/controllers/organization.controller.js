/**
 * Organization Controller — NexoApps Phase 10D
 */

const organizationService = require('../services/organization.service');
const sessionManagerService = require('../services/session_manager.service');

class OrganizationController {
  async getOrganizations(req, res) {
    try {
      const orgs = await organizationService.getOrganizations();
      res.json({ success: true, data: orgs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getActiveSessions(req, res) {
    try {
      const sessions = await sessionManagerService.getActiveSessions();
      res.json({ success: true, data: sessions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new OrganizationController();
