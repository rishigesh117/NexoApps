/**
 * Deployment Controller — NexoApps Phase 11B (v8.2)
 */

const deploymentEndpointService = require('../services/deployment_endpoint.service');
const inferenceService = require('../services/inference.service');

class DeploymentController {
  async getDeployments(req, res) {
    try {
      const deps = await deploymentEndpointService.getDeployments();
      res.json({ success: true, data: deps });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getInferenceStats(req, res) {
    try {
      const stats = await inferenceService.getInferenceStats();
      res.json({ success: true, data: stats });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new DeploymentController();
