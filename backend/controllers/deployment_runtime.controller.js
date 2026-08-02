/**
 * Deployment Runtime Controller — NexoApps Phase 8B
 */

const deploymentRuntimeService = require('../services/deployment_runtime.service');
const runtimeScalingService = require('../services/runtime_scaling.service');

const deploymentRuntimeController = {
  async listDeployments(req, res) {
    try {
      const deployments = await deploymentRuntimeService.listDeployments(req.params.environmentId || 'default');
      res.json({ success: true, data: deployments });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createDeployment(req, res) {
    try {
      const deployment = await deploymentRuntimeService.createDeployment(req.body);
      res.status(201).json({ success: true, data: deployment });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getScalingPolicy(req, res) {
    try {
      const policy = await runtimeScalingService.getScalingPolicy(req.params.deploymentId);
      res.json({ success: true, data: policy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async setScalingPolicy(req, res) {
    try {
      const policy = await runtimeScalingService.setScalingPolicy(req.params.deploymentId, req.body);
      res.json({ success: true, data: policy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = deploymentRuntimeController;
