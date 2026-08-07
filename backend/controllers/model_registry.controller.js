/**
 * Model Registry Controller — NexoApps Phase 11B (v8.2)
 */

const modelRegistryService = require('../services/model_registry.service');

class ModelRegistryController {
  async getModels(req, res) {
    try {
      const models = await modelRegistryService.getModels();
      res.json({ success: true, data: models });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ModelRegistryController();
