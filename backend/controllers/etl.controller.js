/**
 * ETL Controller — NexoApps Phase 7C
 */

const etlService = require('../services/etl.service');

const etlController = {
  async listJobs(req, res) {
    try {
      const jobs = await etlService.listJobs(req.query.tenantId || 'default');
      res.json({ success: true, data: jobs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getJob(req, res) {
    try {
      const job = await etlService.getJob(req.params.id);
      res.json({ success: true, data: job });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createJob(req, res) {
    try {
      const job = await etlService.createJob(req.body);
      res.status(201).json({ success: true, data: job });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async runJob(req, res) {
    try {
      const run = await etlService.runJob(req.params.id);
      res.json({ success: true, data: run });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getJobRuns(req, res) {
    try {
      const runs = await etlService.getJobRuns(req.params.id);
      res.json({ success: true, data: runs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listPipelines(req, res) {
    try {
      const pipelines = await etlService.listPipelines(req.query.tenantId || 'default');
      res.json({ success: true, data: pipelines });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createPipeline(req, res) {
    try {
      const pipeline = await etlService.createPipeline(req.body);
      res.status(201).json({ success: true, data: pipeline });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async deleteJob(req, res) {
    try {
      const result = await etlService.deleteJob(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = etlController;
