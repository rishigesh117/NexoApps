/**
 * Session Manager Service — NexoApps Phase 10D
 * Active sessions monitoring, device trust verification, and session revocation.
 */

class SessionManagerService {
  constructor() {
    this.sessions = [
      { id: 'sess-1001', userId: 'user-admin', deviceId: 'dev-macbook-pro', ipAddress: '192.168.1.10', userAgent: 'Mozilla/5.0 (Macintosh)', isMfaVerified: true, expiresAt: new Date(Date.now() + 86400000).toISOString(), createdAt: new Date().toISOString() }
    ];
  }

  async getActiveSessions() {
    return this.sessions;
  }
}

module.exports = new SessionManagerService();
