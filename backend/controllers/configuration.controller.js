/**
 * Configuration Controller — NexoApps Phase 10E (v8.0)
 */

const configurationService = require('../services/configuration.service');

class ConfigurationController {
  async getConfigs(req, res) {
    try {
      const configs = await configurationService.getConfigs();
      res.json({ success: true, data: configs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ConfigurationController();
