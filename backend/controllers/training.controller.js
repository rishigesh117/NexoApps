/**
 * Training Controller — NexoApps Phase 11B (v8.2)
 */

const trainingService = require('../services/training.service');
const experimentService = require('../services/experiment.service');

class TrainingController {
  async getJobs(req, res) {
    try {
      const jobs = await trainingService.getJobs();
      res.json({ success: true, data: jobs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getExperiments(req, res) {
    try {
      const experiments = await experimentService.getExperiments();
      res.json({ success: true, data: experiments });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new TrainingController();
