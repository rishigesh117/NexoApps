/**
 * Environment Controller — NexoApps Phase 7D
 */

const environmentService = require('../services/environment.service');
const secretManagerService = require('../services/secret_manager.service');

const environmentController = {
  async listProfiles(req, res) {
    try {
      const profiles = await environmentService.listProfiles(req.query.tenantId || 'default');
      res.json({ success: true, data: profiles });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createProfile(req, res) {
    try {
      const profile = await environmentService.createProfile(req.body);
      res.status(201).json({ success: true, data: profile });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listVariables(req, res) {
    try {
      const variables = await environmentService.listVariables(req.params.profileId);
      res.json({ success: true, data: variables });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async addVariable(req, res) {
    try {
      const variable = await environmentService.addVariable(req.params.profileId, req.body);
      res.status(201).json({ success: true, data: variable });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listSecrets(req, res) {
    try {
      const secrets = await secretManagerService.listSecrets(req.query.tenantId || 'default');
      res.json({ success: true, data: secrets });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createSecret(req, res) {
    try {
      const secret = await secretManagerService.createSecret(req.body);
      res.status(201).json({ success: true, data: secret });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async rotateSecret(req, res) {
    try {
      const result = await secretManagerService.rotateSecret(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = environmentController;
