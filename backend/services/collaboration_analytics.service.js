/**
 * Collaboration Analytics Service — NexoApps Phase 11D (v8.4)
 * Provides metrics, activity feeds, team notifications, and audit logs.
 */

class CollaborationAnalyticsService {
  constructor() {
    this.analytics = [
      {
        id: 'ca-1',
        workspaceId: 'ws-main',
        activeUsersDaily: 48,
        messagesSent: 342,
        meetingsHeld: 12,
        docsCreated: 18,
        recordedDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      }
    ];

    this.notifications = [
      {
        id: 'tn-1',
        recipientId: 'user-admin',
        title: 'Phase 11D Version 8.4 Released',
        message: 'The AI Collaboration Platform is now fully deployed and active across all workspace services.',
        notificationType: 'info',
        isRead: 0,
        linkUrl: '/collaboration/dashboard',
        createdAt: new Date().toISOString()
      }
    ];

    this.recommendations = [
      {
        id: 'kr-1',
        userId: 'user-admin',
        articleId: 'art-1',
        relevanceScore: 0.98,
        reason: 'Recommended based on your interest in Enterprise AI Workspace features.',
        createdAt: new Date().toISOString()
      }
    ];

    this.auditLogs = [
      {
        id: 'cal-1',
        workspaceId: 'ws-main',
        userId: 'user-admin',
        action: 'workspace.created',
        resourceType: 'workspace',
        resourceId: 'ws-main',
        ipAddress: '127.0.0.1',
        createdAt: new Date().toISOString()
      }
    ];
  }

  async getAnalytics(workspaceId) {
    return this.analytics.find(a => a.workspaceId === workspaceId) || this.analytics[0];
  }

  async getTeamNotifications(recipientId) {
    return this.notifications.filter(n => n.recipientId === recipientId || !recipientId);
  }

  async getKnowledgeRecommendations(userId) {
    return this.recommendations.filter(r => r.userId === userId || !userId);
  }

  async getAuditLogs(workspaceId) {
    return this.auditLogs.filter(l => l.workspaceId === workspaceId || !workspaceId);
  }
}

module.exports = new CollaborationAnalyticsService();
