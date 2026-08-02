/**
 * Agent Scheduler Service — NexoApps Phase 8A
 * Autonomous cron schedules and recurring task dispatching for agents.
 */

const { v4: uuidv4 } = require('uuid');

class AgentSchedulerService {
  async listSchedules(agentId) {
    return [
      { id: uuidv4(), agentId, cronExpression: '0 */4 * * *', taskDefinition: 'Run autonomous codebase security scan', isEnabled: true, lastRunAt: new Date(Date.now() - 3600000).toISOString(), nextRunAt: new Date(Date.now() + 10800000).toISOString(), createdAt: new Date().toISOString() },
      { id: uuidv4(), agentId, cronExpression: '0 2 * * *', taskDefinition: 'Prune stale vector embeddings & memory cache', isEnabled: true, lastRunAt: new Date(Date.now() - 86400000).toISOString(), nextRunAt: new Date(Date.now() + 43200000).toISOString(), createdAt: new Date().toISOString() },
    ];
  }

  async createSchedule(data) {
    return { id: uuidv4(), ...data, isEnabled: true, createdAt: new Date().toISOString() };
  }
}

module.exports = new AgentSchedulerService();
