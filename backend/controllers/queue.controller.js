/**
 * Queue Controller — NexoApps Phase 12A (v9.1)
 */

const queueService = require('../services/queue.service');
const jobsService = require('../services/background_jobs.service');
const schedulerService = require('../services/scheduler.service');

class QueueController {
  async getQueues(req, res) {
    try {
      const queues = await queueService.getQueues();
      res.json({ success: true, data: queues });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getJobs(req, res) {
    try {
      const jobs = await jobsService.getJobs();
      const schedules = await schedulerService.getSchedules();
      res.json({ success: true, data: { jobs, schedules } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new QueueController();
