/**
 * Report Controller — NexoApps Phase 7C
 */

const reportService = require('../services/report.service');

const reportController = {
  async listReports(req, res) {
    try {
      const reports = await reportService.listReports(req.query.tenantId || 'default');
      res.json({ success: true, data: reports });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getReport(req, res) {
    try {
      const report = await reportService.getReport(req.params.id);
      res.json({ success: true, data: report });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createReport(req, res) {
    try {
      const report = await reportService.createReport(req.body);
      res.status(201).json({ success: true, data: report });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async updateReport(req, res) {
    try {
      const report = await reportService.updateReport(req.params.id, req.body);
      res.json({ success: true, data: report });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async deleteReport(req, res) {
    try {
      const result = await reportService.deleteReport(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listSchedules(req, res) {
    try {
      const schedules = await reportService.listSchedules(req.params.id);
      res.json({ success: true, data: schedules });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createSchedule(req, res) {
    try {
      const schedule = await reportService.createSchedule(req.body);
      res.status(201).json({ success: true, data: schedule });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listExports(req, res) {
    try {
      const exports = await reportService.listExports(req.params.id);
      res.json({ success: true, data: exports });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async exportReport(req, res) {
    try {
      const result = await reportService.exportReport(req.params.id, req.query.format || 'pdf');
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = reportController;
