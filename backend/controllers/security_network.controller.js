/**
 * Security Network Controller — NexoApps Phase 12D (v9.4)
 * WAF, Firewall, and Network Security policies.
 */

const wafService = require('../services/waf.service');
const firewallService = require('../services/firewall.service');
const networkPolicyService = require('../services/network_policy.service');

class SecurityNetworkController {
  async getWafPolicies(req, res) {
    try {
      const policies = await wafService.getPolicies();
      res.json({ success: true, data: policies });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getWafRules(req, res) {
    try {
      const rules = await wafService.getRules(req.query.policyId);
      res.json({ success: true, data: rules });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createWafPolicy(req, res) {
    try {
      const { policyName } = req.body;
      if (!policyName) return res.status(400).json({ success: false, error: 'policyName is required' });
      const policy = await wafService.createPolicy(req.body);
      res.status(201).json({ success: true, data: policy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getFirewallPolicies(req, res) {
    try {
      const policies = await firewallService.getPolicies();
      res.json({ success: true, data: policies });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createFirewallPolicy(req, res) {
    try {
      const { policyName } = req.body;
      if (!policyName) return res.status(400).json({ success: false, error: 'policyName is required' });
      const policy = await firewallService.createPolicy(req.body);
      res.status(201).json({ success: true, data: policy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getNetworkPolicies(req, res) {
    try {
      const policies = await networkPolicyService.getPolicies();
      res.json({ success: true, data: policies });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createNetworkPolicy(req, res) {
    try {
      const { policyName } = req.body;
      if (!policyName) return res.status(400).json({ success: false, error: 'policyName is required' });
      const policy = await networkPolicyService.createPolicy(req.body);
      res.status(201).json({ success: true, data: policy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new SecurityNetworkController();
