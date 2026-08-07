/**
 * Provider Controller — NexoApps Phase 9A
 */

const providerManagerService = require('../services/provider_manager.service');

const providerController = {
  async listProviders(req, res) {
    try {
      const providers = await providerManagerService.listProviders();
      res.json({ success: true, data: providers });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getProviderById(req, res) {
    try {
      const provider = await providerManagerService.getProviderById(req.params.id);
      if (!provider) {
        return res.status(404).json({ success: false, error: 'Provider not found' });
      }
      res.json({ success: true, data: provider });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createProvider(req, res) {
    try {
      const newProv = await providerManagerService.createProvider(req.body);
      res.status(201).json({ success: true, data: newProv });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listModels(req, res) {
    try {
      const { providerId } = req.query;
      const models = await providerManagerService.listModels(providerId);
      res.json({ success: true, data: models });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listCredentials(req, res) {
    try {
      const creds = await providerManagerService.listCredentials();
      res.json({ success: true, data: creds });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async addCredential(req, res) {
    try {
      const cred = await providerManagerService.addCredential(req.body);
      res.status(201).json({ success: true, data: cred });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = providerController;
