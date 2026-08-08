/**
 * Cloud Cost Controller — NexoApps Phase 12E (v9.5)
 */

const cloudCostService = require('../services/cloud_cost.service');
const infrastructureOptimizerService = require('../services/infrastructure_optimizer.service');

class CloudCostController {
  async getCostSummary(req, res) {
    try {
      const summary = await cloudCostService.getCostSummary();
      res.json({ success: true, data: summary });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getRecommendations(req, res) {
    try {
      const recs = await infrastructureOptimizerService.getRecommendations();
      res.json({ success: true, data: recs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new CloudCostController();
