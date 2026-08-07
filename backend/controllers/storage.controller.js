/**
 * Storage Controller — NexoApps Phase 12A (v9.1)
 */

const storageService = require('../services/storage.service');
const cdnService = require('../services/cdn.service');

class StorageInfrastructureController {
  async getStorage(req, res) {
    try {
      const providers = await storageService.getProviders();
      const buckets = await storageService.getBuckets();
      const objects = await storageService.getObjects();
      const cdns = await cdnService.getCDNConfigs();
      res.json({ success: true, data: { providers, buckets, objects, cdns } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new StorageInfrastructureController();
