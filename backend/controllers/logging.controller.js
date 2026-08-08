/**
 * Logging Controller — NexoApps Phase 12C (v9.3)
 */

const loggingService = require('../services/logging.service');

class LoggingController {
  async getSources(req, res) {
    try {
      const sources = await loggingService.getSources();
      res.json({ success: true, data: sources });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getStreams(req, res) {
    try {
      const streams = await loggingService.getStreams(req.query.sourceId);
      res.json({ success: true, data: streams });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getLogs(req, res) {
    try {
      const logs = await loggingService.searchLogs(req.query);
      res.json({ success: true, data: logs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async searchLogs(req, res) {
    try {
      const logs = await loggingService.searchLogs(req.body);
      res.json({ success: true, data: logs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async ingestLog(req, res) {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ success: false, error: 'Log message is required' });
      }
      const entry = await loggingService.ingestLog(req.body);
      res.status(201).json({ success: true, data: entry });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new LoggingController();
