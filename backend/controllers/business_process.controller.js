/**
 * Business Process Controller — NexoApps Phase 8D
 */

const businessProcessService = require('../services/business_process.service');

const businessProcessController = {
  async listProcesses(req, res) {
    try {
      const processes = await businessProcessService.listProcesses(req.query.tenantId || 'default');
      res.json({ success: true, data: processes });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createProcess(req, res) {
    try {
      const process = await businessProcessService.createProcess(req.body);
      res.status(201).json({ success: true, data: process });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async triggerProcess(req, res) {
    try {
      const instance = await businessProcessService.triggerProcess(req.params.id);
      res.json({ success: true, data: instance });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = businessProcessController;
