/**
 * Global AI Controller — NexoApps Phase 8E
 */

const globalAIService = require('../services/global_ai.service');

const globalAIController = {
  async listClusters(req, res) {
    try {
      const clusters = await globalAIService.listClusters(req.query.tenantId || 'default');
      res.json({ success: true, data: clusters });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = globalAIController;
