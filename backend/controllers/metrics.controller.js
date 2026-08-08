/**
 * Metrics Controller — NexoApps Phase 12C (v9.3)
 */

const metricsService = require('../services/metrics.service');

class MetricsController {
  async getMetrics(req, res) {
    try {
      const definitions = await metricsService.getMetricDefinitions();
      res.json({ success: true, data: definitions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getSamples(req, res) {
    try {
      const samples = await metricsService.getMetricSamples(req.query);
      res.json({ success: true, data: samples });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async queryMetrics(req, res) {
    try {
      const result = await metricsService.queryMetrics(req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async recordSample(req, res) {
    try {
      const { metricId, value } = req.body;
      if (!metricId || value === undefined) {
        return res.status(400).json({ success: false, error: 'metricId and value are required' });
      }
      const sample = await metricsService.recordSample(req.body);
      res.status(201).json({ success: true, data: sample });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new MetricsController();
