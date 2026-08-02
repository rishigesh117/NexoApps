/**
 * Activity Feed Service
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

class ActivityFeedService {
  constructor() {
    this.feed = [
      {
        id: 'act-1',
        userId: 'usr-1',
        module: 'AGENTS',
        action: 'AGENT_REVIEW_COMPLETED',
        description: 'Code Review Agent completed security scan on 12 files (0 critical vulnerabilities).',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'act-2',
        userId: 'usr-1',
        module: 'PLATFORM',
        action: 'MODEL_DEPLOYED',
        description: 'Nexo-LLM 7B Instruct model deployed to Production cluster.',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: 'act-3',
        userId: 'usr-1',
        module: 'MARKETPLACE',
        action: 'ASSET_PUBLISHED',
        description: 'Published Batlytics Match Predictor Agent to AI Marketplace.',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
    ];
  }

  getActivityFeed() {
    return this.feed;
  }
}

module.exports = new ActivityFeedService();
