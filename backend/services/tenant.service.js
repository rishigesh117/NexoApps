/**
 * Multi-Tenant Organization Service
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

class TenantService {
  constructor() {
    this.tenants = [
      {
        id: 't-1',
        ownerUserId: 'usr-1',
        name: 'Batlytics Sports Inc.',
        slug: 'batlytics-sports',
        planTier: 'ENTERPRISE',
        status: 'ACTIVE',
        membersCount: 14,
        createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
      },
      {
        id: 't-2',
        ownerUserId: 'usr-1',
        name: 'Nexo AI Developer Org',
        slug: 'nexo-ai-dev-org',
        planTier: 'PROFESSIONAL',
        status: 'ACTIVE',
        membersCount: 6,
        createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
      },
    ];
  }

  getTenants() {
    return this.tenants;
  }

  getTenantBySlug(slug) {
    return this.tenants.find((t) => t.slug === slug || t.id === slug) || this.tenants[0];
  }

  createTenant(ownerUserId, data) {
    const slug = (data.name || 'new-tenant').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newTenant = {
      id: `t-${Date.now()}`,
      ownerUserId: ownerUserId || 'usr-1',
      name: data.name || 'New Organization',
      slug,
      planTier: data.planTier || 'STARTER',
      status: 'ACTIVE',
      membersCount: 1,
      createdAt: new Date().toISOString(),
    };
    this.tenants.unshift(newTenant);
    return newTenant;
  }
}

module.exports = new TenantService();
