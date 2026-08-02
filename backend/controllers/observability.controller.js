/**
 * Observability Controller — NexoApps Phase 8E
 */

const observabilityService = require('../services/observability.service');
const platformHealthV2Service = require('../services/platform_health_v2.service');
const optimizationService = require('../services/optimization.service');

const observabilityController = {
  async getTelemetry(req, res) {
    try {
      const telemetry = await observabilityService.getTelemetry();
      res.json({ success: true, data: telemetry });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getHealthSnapshot(req, res) {
    try {
      const snapshot = await platformHealthV2Service.getSnapshot();
      res.json({ success: true, data: snapshot });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getOptimizationProfiles(req, res) {
    try {
      const profiles = await optimizationService.getProfiles();
      res.json({ success: true, data: profiles });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = observabilityController;
