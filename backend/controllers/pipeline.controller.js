/**
 * Pipeline Controller — NexoApps Phase 11A (v8.1)
 */

const pipelineService = require('../services/pipeline.service');

class PipelineController {
  async getPipelines(req, res) {
    try {
      const pipelines = await pipelineService.getPipelines();
      res.json({ success: true, data: pipelines });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getRuns(req, res) {
    try {
      const runs = await pipelineService.getRuns();
      res.json({ success: true, data: runs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new PipelineController();
