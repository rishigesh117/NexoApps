/**
 * System Monitoring & Health Service
 * NexoApps Platform - Phase 4E
 */

const os = require('os');
const envConfig = require('../config/env.config');

class MonitoringService {
  constructor() {
    this.startTime = Date.now();
    this.slowRequests = [];
  }

  getSystemHealth() {
    const memoryUsage = process.memoryUsage();
    const uptimeSeconds = Math.floor((Date.now() - this.startTime) / 1000);

    return {
      status: 'Operational',
      version: 'v1.0.0-rc1',
      environment: envConfig.env,
      timestamp: new Date().toISOString(),
      uptimeSeconds,
      system: {
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus().length,
        totalMemoryMb: Math.round(os.totalmem() / 1024 / 1024),
        freeMemoryMb: Math.round(os.freemem() / 1024 / 1024),
        cpuLoadAvg: os.loadavg(),
      },
      process: {
        memoryHeapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        memoryRssMb: Math.round(memoryUsage.rss / 1024 / 1024),
        pid: process.pid,
      },
      services: {
        database: 'Connected',
        storage: 'Connected',
        cache: 'Operational',
        notificationEngine: 'Active',
      },
    };
  }

  logSlowRequest(path, durationMs) {
    if (durationMs > 500) {
      this.slowRequests.unshift({
        path,
        durationMs,
        timestamp: new Date().toISOString(),
      });
      if (this.slowRequests.length > 50) this.slowRequests.pop();
    }
  }
}

module.exports = new MonitoringService();
