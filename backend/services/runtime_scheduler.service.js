/**
 * Runtime Scheduler Service — NexoApps Phase 8B
 * Scheduled runtime jobs and execution triggers.
 */

const { v4: uuidv4 } = require('uuid');

class RuntimeSchedulerService {
  async listJobs(environmentId) {
    return [
      { id: uuidv4(), environmentId, jobName: 'Cron Data Cleanup Job', command: 'npm run prune:logs', status: 'completed', executedAt: new Date().toISOString() },
    ];
  }
}

module.exports = new RuntimeSchedulerService();
