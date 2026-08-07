/**
 * Identity Controller — NexoApps Phase 10D
 */

const identityService = require('../services/identity.service');
const accessControlService = require('../services/access_control.service');

class IdentityController {
  async getProviders(req, res) {
    try {
      const providers = await identityService.getIdentityProviders();
      res.json({ success: true, data: providers });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getRoles(req, res) {
    try {
      const roles = await accessControlService.getRoles();
      res.json({ success: true, data: roles });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new IdentityController();
