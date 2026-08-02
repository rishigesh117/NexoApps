/**
 * Prediction Controller — NexoApps Phase 7C
 */

const predictionService = require('../services/prediction.service');

const predictionController = {
  async listJobs(req, res) {
    try {
      const jobs = await predictionService.listJobs(req.query.tenantId || 'default');
      res.json({ success: true, data: jobs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createJob(req, res) {
    try {
      const job = await predictionService.createJob(req.body);
      res.status(201).json({ success: true, data: job });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getJobResults(req, res) {
    try {
      const results = await predictionService.getJobResults(req.params.id);
      res.json({ success: true, data: results });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listAuditReports(req, res) {
    try {
      const reports = await predictionService.getAuditReports(req.query.tenantId || 'default');
      res.json({ success: true, data: reports });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async generateAuditReport(req, res) {
    try {
      const report = await predictionService.generateAuditReport(req.body);
      res.status(201).json({ success: true, data: report });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = predictionController;
