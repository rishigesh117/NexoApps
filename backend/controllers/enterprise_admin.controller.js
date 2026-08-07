/**
 * Enterprise Admin Controller — NexoApps Phase 11E (v9.0)
 */

const aiService = require('../services/enterprise_ai.service');
const monitorService = require('../services/enterprise_monitor.service');
const costService = require('../services/enterprise_cost.service');

class EnterpriseAdminController {
  async getAIHub(req, res) {
    try {
      const aiServices = await aiService.getAIServices();
      const aiAgents = await aiService.getAIAgents();
      res.json({ success: true, data: { aiServices, aiAgents } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getHealth(req, res) {
    try {
      const health = await monitorService.getHealthStatus();
      const metrics = await monitorService.getMetrics();
      res.json({ success: true, data: { health, metrics } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getCosts(req, res) {
    try {
      const costs = await costService.getCostSummary();
      res.json({ success: true, data: costs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new EnterpriseAdminController();
