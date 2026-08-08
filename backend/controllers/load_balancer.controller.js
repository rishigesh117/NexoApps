/**
 * Load Balancer Controller — NexoApps Phase 12D (v9.4)
 */

const loadBalancerService = require('../services/load_balancer.service');

class LoadBalancerController {
  async getLoadBalancers(req, res) {
    try {
      const lbs = await loadBalancerService.getLoadBalancers();
      res.json({ success: true, data: lbs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getTargets(req, res) {
    try {
      const targets = await loadBalancerService.getTargets(req.query.loadBalancerId);
      res.json({ success: true, data: targets });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createLoadBalancer(req, res) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ success: false, error: 'Load balancer name is required' });
      const lb = await loadBalancerService.createLoadBalancer(req.body);
      res.status(201).json({ success: true, data: lb });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new LoadBalancerController();
