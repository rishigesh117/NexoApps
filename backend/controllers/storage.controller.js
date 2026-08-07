/**
 * Storage Controller — NexoApps Phase 10B
 */

const storageService = require('../services/storage.service');

class StorageController {
  async getVolumes(req, res) {
    try {
      const volumes = await storageService.getVolumes();
      res.json({ success: true, data: volumes });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getBuckets(req, res) {
    try {
      const buckets = await storageService.getBuckets();
      res.json({ success: true, data: buckets });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new StorageController();
