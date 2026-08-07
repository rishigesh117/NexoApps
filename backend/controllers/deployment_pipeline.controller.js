/**
 * Deployment Pipeline Controller — NexoApps Phase 9B
 */

const deploymentPipelineService = require('../services/deployment_pipeline.service');
const applicationTestingService = require('../services/application_testing.service');
const applicationVersioningService = require('../services/application_versioning.service');

const deploymentPipelineController = {
  async triggerBuild(req, res) {
    try {
      const build = await deploymentPipelineService.triggerBuild(req.params.applicationId);
      res.status(201).json({ success: true, data: build });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async deployBuild(req, res) {
    try {
      const deployment = await deploymentPipelineService.deployBuild(
        req.params.applicationId,
        req.body.buildId,
        req.body.environment
      );
      res.status(201).json({ success: true, data: deployment });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listBuilds(req, res) {
    try {
      const builds = await deploymentPipelineService.listBuilds(req.params.applicationId);
      res.json({ success: true, data: builds });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listDeployments(req, res) {
    try {
      const deployments = await deploymentPipelineService.listDeployments(req.params.applicationId);
      res.json({ success: true, data: deployments });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listEnvironments(req, res) {
    try {
      const envs = await deploymentPipelineService.listEnvironments(req.params.applicationId);
      res.json({ success: true, data: envs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async runTests(req, res) {
    try {
      const tests = await applicationTestingService.runTests(req.params.applicationId);
      res.json({ success: true, data: tests });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listVersions(req, res) {
    try {
      const versions = await applicationVersioningService.listVersions(req.params.applicationId);
      res.json({ success: true, data: versions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = deploymentPipelineController;
