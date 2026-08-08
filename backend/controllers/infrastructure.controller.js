/**
 * Infrastructure Controller — NexoApps Phase 12E (v9.5)
 */

const infrastructureStackService = require('../services/infrastructure_stack.service');
const provisioningService = require('../services/provisioning.service');

class InfrastructureController {
  async getStacks(req, res) {
    try {
      const stacks = await infrastructureStackService.getStacks();
      res.json({ success: true, data: stacks });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createStack(req, res) {
    try {
      const { stackName } = req.body;
      if (!stackName) return res.status(400).json({ success: false, error: 'stackName is required' });
      const stack = await infrastructureStackService.createStack(req.body);
      res.status(201).json({ success: true, data: stack });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getProvisioningJobs(req, res) {
    try {
      const jobs = await provisioningService.getJobs(req.query.stackId);
      res.json({ success: true, data: jobs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getProvisioningLogs(req, res) {
    try {
      const logs = await provisioningService.getLogs(req.query.jobId);
      res.json({ success: true, data: logs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new InfrastructureController();
