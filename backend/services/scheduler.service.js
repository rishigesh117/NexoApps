/**
 * Scheduler Service — NexoApps Phase 12A (v9.1)
 * Scheduled job engine and cron triggers.
 */

class SchedulerService {
  constructor() {
    this.schedules = [
      { id: 'sch-1', scheduleName: 'Hourly Health Telemetry Check', cronExpression: '0 * * * *', isActive: true, createdAt: new Date().toISOString() },
      { id: 'sch-2', scheduleName: 'Daily Production Snapshot Backup', cronExpression: '0 2 * * *', isActive: true, createdAt: new Date().toISOString() }
    ];
  }

  async getSchedules() {
    return this.schedules;
  }
}

module.exports = new SchedulerService();
