/**
 * Workspace Activity & Audit Service
 * NexoApps Platform - Phase 5D
 */

class ActivityService {
  constructor() {
    this.activities = [
      {
        id: 'act-1',
        organizationId: 'org-101',
        projectId: 'proj-1',
        actorId: 'usr-1',
        actorName: 'Rishigesh',
        actionType: 'APK Published',
        description: 'Published Batlytics Cricket Scoring App (v1.0.0-rc1) to Storefront catalog.',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'act-2',
        organizationId: 'org-101',
        projectId: 'proj-2',
        actorId: 'usr-2',
        actorName: 'BatlyticsDev',
        actionType: 'Project Created',
        description: 'Created new project "Live Bluetooth Scorekeeper Hardware Sync".',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'act-3',
        organizationId: 'org-101',
        projectId: 'proj-1',
        actorId: 'usr-1',
        actorName: 'Rishigesh',
        actionType: 'API Key Generated',
        description: 'Generated production API Key "Batlytics-Prod-SDK-Key".',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
    ];

    this.apiKeys = [
      {
        id: 'key-1',
        organizationId: 'org-101',
        keyName: 'Batlytics Production SDK Key',
        apiKey: 'nx_live_9f83a21bc9842a1048e9f',
        permissions: ['read', 'upload_apks'],
        createdBy: 'usr-1',
        lastUsedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 864000000).toISOString(),
      },
    ];
  }

  getActivityFeed(organizationId) {
    if (!organizationId) return this.activities;
    return this.activities.filter((a) => a.organizationId === organizationId);
  }

  getApiKeys(organizationId) {
    if (!organizationId) return this.apiKeys;
    return this.apiKeys.filter((k) => k.organizationId === organizationId);
  }

  createApiKey(organizationId, keyName, permissions = ['read']) {
    const newKey = {
      id: `key-${Date.now()}`,
      organizationId,
      keyName,
      apiKey: `nx_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      permissions,
      createdBy: 'usr-1',
      lastUsedAt: null,
      createdAt: new Date().toISOString(),
    };
    this.apiKeys.unshift(newKey);
    return newKey;
  }
}

module.exports = new ActivityService();
