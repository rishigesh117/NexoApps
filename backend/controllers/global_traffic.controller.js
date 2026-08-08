/**
 * Global Traffic Controller — NexoApps Phase 12E (v9.5)
 */

const globalTrafficService = require('../services/global_traffic.service');
const regionFailoverService = require('../services/region_failover.service');
const globalServiceRegistryService = require('../services/global_service_registry.service');
const servicePlacementService = require('../services/service_placement.service');

class GlobalTrafficController {
  async getRules(req, res) {
    try {
      const rules = await globalTrafficService.getRules();
      res.json({ success: true, data: rules });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createRule(req, res) {
    try {
      const { ruleName } = req.body;
      if (!ruleName) return res.status(400).json({ success: false, error: 'ruleName is required' });
      const rule = await globalTrafficService.createRule(req.body);
      res.status(201).json({ success: true, data: rule });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getFailoverPolicies(req, res) {
    try {
      const policies = await regionFailoverService.getPolicies();
      res.json({ success: true, data: policies });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createFailoverPolicy(req, res) {
    try {
      const { policyName } = req.body;
      if (!policyName) return res.status(400).json({ success: false, error: 'policyName is required' });
      const policy = await regionFailoverService.createPolicy(req.body);
      res.status(201).json({ success: true, data: policy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getServices(req, res) {
    try {
      const services = await globalServiceRegistryService.getServices();
      res.json({ success: true, data: services });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getServiceBindings(req, res) {
    try {
      const bindings = await servicePlacementService.getBindings(req.query.serviceId);
      res.json({ success: true, data: bindings });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new GlobalTrafficController();
