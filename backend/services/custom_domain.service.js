/**
 * Custom Domain CNAME Service
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

class CustomDomainService {
  getDomains(tenantId) {
    return [
      {
        id: 'dom-1',
        tenantId: tenantId || 't-1',
        domainName: 'app.batlytics.dev',
        isVerified: true,
        isPrimary: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

module.exports = new CustomDomainService();
