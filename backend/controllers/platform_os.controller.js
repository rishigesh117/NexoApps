/**
 * Platform OS Controller — NexoApps Phase 9E
 */

const moduleRegistryService = require('../services/module_registry.service');
const platformManagerService = require('../services/platform_manager.service');
const featureFlagService = require('../services/feature_flag.service');
const systemDashboardService = require('../services/system_dashboard.service');

const platformOsController = {
  async getDashboardMetrics(req, res) {
    try {
      const metrics = await systemDashboardService.getDashboardMetrics();
      res.json({ success: true, data: metrics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listModules(req, res) {
    try {
      const modules = await moduleRegistryService.listModules();
      res.json({ success: true, data: modules });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getModuleHealth(req, res) {
    try {
      const health = await moduleRegistryService.getHealth();
      res.json({ success: true, data: health });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listFeatureFlags(req, res) {
    try {
      const flags = await featureFlagService.listFlags();
      res.json({ success: true, data: flags });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getVersionHistory(req, res) {
    try {
      const history = await platformManagerService.getVersionHistory();
      res.json({ success: true, data: history });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = platformOsController;
