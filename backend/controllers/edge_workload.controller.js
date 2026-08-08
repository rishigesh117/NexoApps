/**
 * Edge Workload Controller — NexoApps Phase 12E (v9.5)
 */

const edgeWorkloadService = require('../services/edge_workload.service');
const edgeDeploymentService = require('../services/edge_deployment.service');

class EdgeWorkloadController {
  async getWorkloads(req, res) {
    try {
      const workloads = await edgeWorkloadService.getWorkloads();
      res.json({ success: true, data: workloads });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createWorkload(req, res) {
    try {
      const { workloadName, containerImage } = req.body;
      if (!workloadName || !containerImage) return res.status(400).json({ success: false, error: 'workloadName and containerImage are required' });
      const workload = await edgeWorkloadService.createWorkload(req.body);
      res.status(201).json({ success: true, data: workload });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getDeployments(req, res) {
    try {
      const deployments = await edgeDeploymentService.getDeployments(req.query.workloadId);
      res.json({ success: true, data: deployments });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new EdgeWorkloadController();
