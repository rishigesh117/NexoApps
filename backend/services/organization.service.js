/**
 * Organization Service
 * NexoApps Platform - Phase 5D
 */

class OrganizationService {
  constructor() {
    this.organizations = [
      {
        id: 'org-101',
        name: 'Batlytics Studio Org',
        slug: 'batlytics-studio',
        ownerId: 'usr-1',
        description: 'Enterprise organization building high-precision cricket scoring and sports performance engines.',
        websiteUrl: 'https://batlytics.com',
        country: 'India',
        logoUrl: '🏏',
        bannerUrl: '',
        status: 'Verified',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        membersCount: 5,
        projectsCount: 3,
      },
    ];
  }

  getAllOrganizations() {
    return this.organizations;
  }

  getOrganizationBySlug(slug) {
    return this.organizations.find((o) => o.slug === slug) || null;
  }

  getOrganizationById(id) {
    return this.organizations.find((o) => o.id === id) || null;
  }

  createOrganization(data, ownerId) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newOrg = {
      id: `org-${Date.now()}`,
      name: data.name,
      slug,
      ownerId: ownerId || 'usr-1',
      description: data.description || '',
      websiteUrl: data.websiteUrl || '',
      country: data.country || 'India',
      logoUrl: data.logoUrl || '🏢',
      bannerUrl: '',
      status: 'Active',
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      membersCount: 1,
      projectsCount: 0,
    };
    this.organizations.unshift(newOrg);
    return newOrg;
  }

  updateOrganization(id, patch) {
    const org = this.getOrganizationById(id);
    if (!org) throw new Error('Organization not found');
    Object.assign(org, patch, { updatedAt: new Date().toISOString() });
    return org;
  }

  deleteOrganization(id) {
    this.organizations = this.organizations.filter((o) => o.id !== id);
    return true;
  }
}

module.exports = new OrganizationService();
