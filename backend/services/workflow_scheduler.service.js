/**
 * Workflow Scheduler Service — NexoApps Phase 11C
 * Cron-based & event-driven job scheduling for autonomous workflows.
 */

const { v4: uuidv4 } = require('uuid');

class WorkflowSchedulerService {
  async listSchedules(workflowId) {
    return [
      {
        id: 'sched-101',
        workflowId: workflowId || 'wf-1001',
        cronExpression: '0 0 * * *', // Daily midnight
        timezone: 'UTC',
        isEnabled: true,
        lastRunAt: new Date(Date.now() - 86400000).toISOString(),
        nextRunAt: new Date(Date.now() + 86400000).toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: 'sched-102',
        workflowId: workflowId || 'wf-1002',
        cronExpression: '*/15 * * * *', // Every 15 mins
        timezone: 'America/New_York',
        isEnabled: true,
        lastRunAt: new Date(Date.now() - 900000).toISOString(),
        nextRunAt: new Date(Date.now() + 900000).toISOString(),
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async createSchedule(data) {
    return {
      id: `sched-${uuidv4().substring(0, 8)}`,
      workflowId: data.workflowId,
      cronExpression: data.cronExpression || '0 0 * * *',
      timezone: data.timezone || 'UTC',
      isEnabled: data.isEnabled !== false,
      lastRunAt: null,
      nextRunAt: new Date(Date.now() + 3600000).toISOString(),
      createdAt: new Date().toISOString(),
    };
  }

  async toggleSchedule(scheduleId, isEnabled) {
    return {
      id: scheduleId,
      isEnabled,
      updatedAt: new Date().toISOString(),
    };
  }
}

module.exports = new WorkflowSchedulerService();
