/**
 * Vault Controller — NexoApps Phase 10D
 */

const secretVaultService = require('../services/secret_vault.service');
const apiKeyService = require('../services/api_key.service');

class VaultController {
  async getSecrets(req, res) {
    try {
      const secrets = await secretVaultService.getSecrets();
      res.json({ success: true, data: secrets });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getApiKeys(req, res) {
    try {
      const keys = await apiKeyService.getApiKeys();
      res.json({ success: true, data: keys });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new VaultController();
