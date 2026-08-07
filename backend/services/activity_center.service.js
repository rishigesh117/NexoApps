/**
 * Activity Center Service — NexoApps Phase 9E
 * Unified cross-module activity stream & audit trail logger.
 */

class ActivityCenterService {
  constructor() {
    this.activities = [
      { id: 'act-1', userId: 'user-admin', actorName: 'AI Autonomous Engineer', actionTitle: 'Synthesized Microservices Codebase', moduleKey: 'software_engineering', details: 'Generated Express, TypeScript & SQLite schema.', createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 'act-2', userId: 'user-admin', actorName: 'Marketplace Engine', actionTitle: 'Installed Enterprise Plugin V2.4', moduleKey: 'marketplace', details: 'Plugin permissions verified and granted.', createdAt: new Date(Date.now() - 7200000).toISOString() },
      { id: 'act-3', userId: 'user-admin', actorName: 'AI Gateway Router', actionTitle: 'Switched Active Model to Claude 3.5 Sonnet', moduleKey: 'ai_gateway', details: 'Latency optimized to 180ms.', createdAt: new Date(Date.now() - 14400000).toISOString() }
    ];
  }

  async listActivities() {
    return this.activities;
  }
}

module.exports = new ActivityCenterService();
