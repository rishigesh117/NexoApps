/**
 * White-Label Branding Service
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

class BrandingService {
  getBranding(tenantId) {
    return {
      id: `b-${tenantId || 't-1'}`,
      tenantId: tenantId || 't-1',
      logoUrl: 'https://nexoapps.dev/assets/logo.png',
      faviconUrl: 'https://nexoapps.dev/assets/favicon.ico',
      primaryColor: '#06b6d4',
      accentColor: '#8b5cf6',
      companyName: 'Batlytics Sports Inc.',
      supportEmail: 'support@batlytics.dev',
      createdAt: new Date().toISOString(),
    };
  }
}

module.exports = new BrandingService();
