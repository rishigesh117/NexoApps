/**
 * Enterprise Controller — NexoApps Phase 11E (v9.0)
 */

const registryService = require('../services/enterprise_registry.service');
const managerService = require('../services/enterprise_manager.service');
const orchestratorService = require('../services/enterprise_orchestrator.service');

class EnterpriseController {
  async getOverview(req, res) {
    try {
      const registry = await registryService.getRegistryInfo();
      const modules = await registryService.getModules();
      const services = await managerService.getServices();
      res.json({ success: true, data: { registry, modules, services } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getModules(req, res) {
    try {
      const modules = await registryService.getModules();
      res.json({ success: true, data: modules });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getServices(req, res) {
    try {
      const services = await managerService.getServices();
      res.json({ success: true, data: services });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getWorkflows(req, res) {
    try {
      const workflows = await orchestratorService.getWorkflows();
      res.json({ success: true, data: workflows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new EnterpriseController();
