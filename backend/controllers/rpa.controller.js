/**
 * RPA Controller — NexoApps Phase 11C
 * Version 8.3
 */

const rpaService = require('../services/rpa.service');

const rpaController = {
  async listBots(req, res) {
    try {
      const bots = await rpaService.listBots();
      res.json({ success: true, data: bots });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createBot(req, res) {
    try {
      const bot = await rpaService.createBot(req.body);
      res.status(201).json({ success: true, data: bot });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listJobs(req, res) {
    try {
      const jobs = await rpaService.listJobs(req.params.botId);
      res.json({ success: true, data: jobs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async triggerJob(req, res) {
    try {
      const job = await rpaService.triggerJob(req.params.botId, req.body.jobName, req.body.parameters);
      res.status(201).json({ success: true, data: job });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = rpaController;
