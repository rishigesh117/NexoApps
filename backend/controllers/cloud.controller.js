/**
 * Cloud Control Controller — NexoApps Phase 12E (v9.5)
 */

const cloudControlPlaneService = require('../services/cloud_control_plane.service');
const cloudProviderService = require('../services/cloud_provider.service');
const cloudAccountService = require('../services/cloud_account.service');

class CloudController {
  async getOverview(req, res) {
    try {
      const overview = await cloudControlPlaneService.getOverview();
      res.json({ success: true, data: overview });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getProviders(req, res) {
    try {
      const providers = await cloudProviderService.getProviders();
      res.json({ success: true, data: providers });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createProvider(req, res) {
    try {
      const { providerName } = req.body;
      if (!providerName) return res.status(400).json({ success: false, error: 'providerName is required' });
      const provider = await cloudProviderService.createProvider(req.body);
      res.status(201).json({ success: true, data: provider });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAccounts(req, res) {
    try {
      const accounts = await cloudAccountService.getAccounts();
      res.json({ success: true, data: accounts });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createAccount(req, res) {
    try {
      const { accountName } = req.body;
      if (!accountName) return res.status(400).json({ success: false, error: 'accountName is required' });
      const account = await cloudAccountService.createAccount(req.body);
      res.status(201).json({ success: true, data: account });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new CloudController();
