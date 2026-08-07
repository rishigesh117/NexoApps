/**
 * Streaming Controller — NexoApps Phase 10C
 */

const streamProcessingService = require('../services/stream_processing.service');

class StreamingController {
  async getTopics(req, res) {
    try {
      const topics = await streamProcessingService.getTopics();
      res.json({ success: true, data: topics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new StreamingController();
