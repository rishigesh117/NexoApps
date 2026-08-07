/**
 * Tenant Controller — NexoApps Phase 10B
 */

const tenantService = require('../services/tenant.service');

class TenantController {
  async getTenants(req, res) {
    try {
      const tenants = await tenantService.getTenants();
      res.json({ success: true, data: tenants });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getTenantById(req, res) {
    try {
      const tenant = await tenantService.getTenantById(req.params.id);
      res.json({ success: true, data: tenant });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createTenant(req, res) {
    try {
      const tenant = await tenantService.createTenant(req.body);
      res.json({ success: true, data: tenant });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new TenantController();
