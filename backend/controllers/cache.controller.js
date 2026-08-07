/**
 * Cache Controller — NexoApps Phase 12A (v9.1)
 */

const cacheService = require('../services/cache.service');

class CacheController {
  async getClusters(req, res) {
    try {
      const clusters = await cacheService.getClusters();
      const nodes = await cacheService.getNodes();
      res.json({ success: true, data: { clusters, nodes } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new CacheController();
