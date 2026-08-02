/**
 * Agent Metrics Controller — NexoApps Phase 8A
 */

const agentMetricsService = require('../services/agent_metrics.service');

const agentMetricsController = {
  async getMetrics(req, res) {
    try {
      const metrics = await agentMetricsService.getMetrics(req.params.agentId || 'all');
      res.json({ success: true, data: metrics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getWorkspaceTelemetry(req, res) {
    try {
      const telemetry = await agentMetricsService.getWorkspaceTelemetry(req.params.workspaceId);
      res.json({ success: true, data: telemetry });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = agentMetricsController;
