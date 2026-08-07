/**
 * Storage Cluster Controller — NexoApps Phase 12B (v9.2)
 */

const storageClusterService = require('../services/storage_cluster.service');

class StorageClusterController {
  async getStorageClusters(req, res) {
    try {
      const clusters = await storageClusterService.getStorageClusters();
      const nodes = await storageClusterService.getStorageNodes();
      res.json({ success: true, data: { clusters, nodes } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new StorageClusterController();
