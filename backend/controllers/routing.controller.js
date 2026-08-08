/**
 * Routing Controller — NexoApps Phase 12D (v9.4)
 */

const routingService = require('../services/routing.service');
const trafficPolicyService = require('../services/traffic_policy.service');
const rateLimitService = require('../services/rate_limit.service');
const apiPolicyService = require('../services/api_policy.service');

class RoutingController {
  async getRoutes(req, res) {
    try {
      const routes = await routingService.getRoutes(req.query.gatewayId);
      res.json({ success: true, data: routes });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createRoute(req, res) {
    try {
      const { routePath } = req.body;
      if (!routePath) return res.status(400).json({ success: false, error: 'routePath is required' });
      const route = await routingService.createRoute(req.body);
      res.status(201).json({ success: true, data: route });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getUpstreams(req, res) {
    try {
      const upstreams = await routingService.getUpstreams();
      res.json({ success: true, data: upstreams });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getTrafficPolicies(req, res) {
    try {
      const policies = await trafficPolicyService.getTrafficPolicies();
      res.json({ success: true, data: policies });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createTrafficPolicy(req, res) {
    try {
      const { policyName } = req.body;
      if (!policyName) return res.status(400).json({ success: false, error: 'policyName is required' });
      const policy = await trafficPolicyService.createTrafficPolicy(req.body);
      res.status(201).json({ success: true, data: policy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getRateLimitPolicies(req, res) {
    try {
      const policies = await rateLimitService.getPolicies();
      res.json({ success: true, data: policies });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createRateLimitPolicy(req, res) {
    try {
      const { policyName } = req.body;
      if (!policyName) return res.status(400).json({ success: false, error: 'policyName is required' });
      const policy = await rateLimitService.createPolicy(req.body);
      res.status(201).json({ success: true, data: policy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getApiPolicies(req, res) {
    try {
      const policies = await apiPolicyService.getPolicies();
      res.json({ success: true, data: policies });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new RoutingController();
