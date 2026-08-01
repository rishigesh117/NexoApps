/**
 * Audit Logging Engine
 * NexoApps Platform - Phase 5E (Version 2.0 EC1)
 */

class AuditLogService {
  constructor() {
    this.logs = [
      {
        id: 'aud-101',
        actorId: 'usr-1',
        actorEmail: 'rishigesh720@gmail.com',
        actorRole: 'OWNER',
        actionType: 'OWNER_PROMOTED',
        resource: '/admin/users',
        details: 'User promoted to platform OWNER privileges.',
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'aud-102',
        actorId: 'usr-1',
        actorEmail: 'rishigesh720@gmail.com',
        actorRole: 'OWNER',
        actionType: 'APK_PUBLISHED',
        resource: 'Batlytics Cricket Scoring App',
        details: 'Published Batlytics APK (v1.0.0-rc1) to Storefront catalog.',
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'aud-103',
        actorId: 'usr-1',
        actorEmail: 'rishigesh720@gmail.com',
        actorRole: 'OWNER',
        actionType: 'CLOUD_BACKUP_RESTORE',
        resource: 'Full Account Snapshot v1.0.0-rc1',
        details: 'Restored encrypted state snapshot.',
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
  }

  getAuditLogs() {
    return this.logs;
  }

  logEvent(actorId, actorEmail, actorRole, actionType, resource, details, ipAddress, userAgent) {
    const entry = {
      id: `aud-${Date.now()}`,
      actorId,
      actorEmail,
      actorRole,
      actionType,
      resource,
      details,
      ipAddress: ipAddress || '127.0.0.1',
      userAgent: userAgent || 'NexoApps Service',
      createdAt: new Date().toISOString(),
    };
    this.logs.unshift(entry);
    return entry;
  }
}

module.exports = new AuditLogService();
