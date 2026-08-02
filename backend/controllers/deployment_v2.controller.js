/**
 * Deployment V2 Controller — NexoApps Phase 7D
 */

const deploymentOrchestratorService = require('../services/deployment_orchestrator.service');
const cloudClusterService = require('../services/cloud_cluster.service');

const deploymentV2Controller = {
  async listTargets(req, res) {
    try {
      const targets = await deploymentOrchestratorService.listTargets(req.query.tenantId || 'default');
      res.json({ success: true, data: targets });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createTarget(req, res) {
    try {
      const target = await deploymentOrchestratorService.createTarget(req.body);
      res.status(201).json({ success: true, data: target });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listJobs(req, res) {
    try {
      const jobs = await deploymentOrchestratorService.listJobs(req.params.targetId);
      res.json({ success: true, data: jobs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createJob(req, res) {
    try {
      const job = await deploymentOrchestratorService.createJob(req.body);
      res.status(201).json({ success: true, data: job });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getLogs(req, res) {
    try {
      const logs = await deploymentOrchestratorService.getLogs(req.params.jobId);
      res.json({ success: true, data: logs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listClusters(req, res) {
    try {
      const clusters = await cloudClusterService.listClusters(req.query.tenantId || 'default');
      res.json({ success: true, data: clusters });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createCluster(req, res) {
    try {
      const cluster = await cloudClusterService.createCluster(req.body);
      res.status(201).json({ success: true, data: cluster });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listClusterNodes(req, res) {
    try {
      const nodes = await cloudClusterService.listNodes(req.params.clusterId);
      res.json({ success: true, data: nodes });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = deploymentV2Controller;
