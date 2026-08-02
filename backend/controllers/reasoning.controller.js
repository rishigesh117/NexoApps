/**
 * Reasoning Controller — NexoApps Phase 8E
 */

const reasoningEngineService = require('../services/reasoning_engine.service');

const reasoningController = {
  async listSessions(req, res) {
    try {
      const sessions = await reasoningEngineService.listSessions();
      res.json({ success: true, data: sessions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async runReasoning(req, res) {
    try {
      const result = await reasoningEngineService.runReasoning(req.body.prompt);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = reasoningController;
