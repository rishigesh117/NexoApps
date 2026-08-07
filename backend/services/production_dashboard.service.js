/**
 * Production Dashboard Service — NexoApps Phase 12A (v9.1)
 * High-level production overview data aggregator.
 */

const cacheService = require('./cache.service');
const queueService = require('./queue.service');
const backgroundJobsService = require('./background_jobs.service');
const performanceService = require('./performance.service');
const healthService = require('./health.service');

class ProductionDashboardService {
  async getOverview() {
    const clusters = await cacheService.getClusters();
    const queues = await queueService.getQueues();
    const jobs = await backgroundJobsService.getJobs();
    const metrics = await performanceService.getPerformanceMetrics();
    const health = await healthService.getHealthChecks();

    return {
      version: '9.1.0',
      status: 'production_ready',
      clustersCount: clusters.length,
      queuesCount: queues.length,
      jobsCount: jobs.length,
      metrics,
      health
    };
  }
}

module.exports = new ProductionDashboardService();
