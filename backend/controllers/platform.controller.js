/**
 * Platform Controller — NexoApps Phase 10E (v8.0)
 */

const platformRegistryService = require('../services/platform_registry.service');
const platformManagerService = require('../services/platform_manager.service');
const healthMonitorService = require('../services/health_monitor.service');
const integrationService = require('../services/integration.service');
const orchestrationService = require('../services/orchestration.service');

class PlatformController {
  async getOverview(req, res) {
    try {
      const overview = await platformManagerService.getOverview();
      res.json({ success: true, data: overview });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getRegistry(req, res) {
    try {
      const registry = await platformRegistryService.getRegistry();
      res.json({ success: true, data: registry });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getModules(req, res) {
    try {
      const modules = await platformRegistryService.getModules();
      res.json({ success: true, data: modules });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getHealth(req, res) {
    try {
      const health = await healthMonitorService.getHealth();
      res.json({ success: true, data: health });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getIntegrations(req, res) {
    try {
      const integrations = await integrationService.getIntegrations();
      res.json({ success: true, data: integrations });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getWorkflows(req, res) {
    try {
      const workflows = await orchestrationService.getWorkflows();
      res.json({ success: true, data: workflows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new PlatformController();
