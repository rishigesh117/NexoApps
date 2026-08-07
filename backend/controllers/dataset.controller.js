/**
 * Dataset Controller — NexoApps Phase 11B (v8.2)
 */

const datasetService = require('../services/dataset.service');
const featureStoreService = require('../services/feature_store.service');

class DatasetController {
  async getDatasets(req, res) {
    try {
      const datasets = await datasetService.getDatasets();
      res.json({ success: true, data: datasets });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getStores(req, res) {
    try {
      const stores = await featureStoreService.getStores();
      res.json({ success: true, data: stores });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new DatasetController();
