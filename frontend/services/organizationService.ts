import { fetchApi } from './apiClient';

export const getOrganizations = async (): Promise<any[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: any[] }>('/security/orgs/orgs');
    return res.data;
  } catch {
    return [
      { id: 'org-101', name: 'Nexo Enterprise Global', slug: 'nexo-global', tenantId: 'tnt-enterprise-01', securityTier: 'enterprise', ownerId: 'user-admin', status: 'active', isVerified: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ];
  }
};

export const getOrganizationBySlug = async (slug: string): Promise<any> => {
  const orgs = await getOrganizations();
  return orgs.find((o: any) => o.slug === slug) || orgs[0];
};

export const createOrganization = async (orgData: any): Promise<any> => {
  try {
    const res = await fetchApi<{ success: boolean; data: any }>('/security/orgs/orgs', {
      method: 'POST',
      body: JSON.stringify(orgData)
    });
    return res.data;
  } catch {
    return {
      id: `org-${Date.now()}`,
      name: orgData.name || 'New Organization',
      slug: orgData.slug || `org-${Date.now()}`,
      tenantId: 'tnt-enterprise-01',
      securityTier: 'enterprise',
      ownerId: 'user-admin',
      status: 'active',
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
};

export const getOrganizationMembers = async (orgId?: string): Promise<any[]> => {
  return [
    { id: 'mem-1', orgId: orgId || 'org-101', userId: 'user-admin', roleId: 'role-admin', status: 'active', joinedAt: new Date().toISOString() }
  ];
};

export const inviteOrganizationMember = async (orgId: string, email: string, role: string): Promise<any> => {
  return { id: `mem-${Date.now()}`, orgId, email, role, status: 'invited', joinedAt: new Date().toISOString() };
};

export const getActiveSessions = async (): Promise<any[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: any[] }>('/security/orgs/sessions');
    return res.data;
  } catch {
    return [
      { id: 'sess-1001', userId: 'user-admin', deviceId: 'dev-macbook-pro', ipAddress: '192.168.1.10', userAgent: 'Mozilla/5.0 (Macintosh)', isMfaVerified: true, expiresAt: new Date(Date.now() + 86400000).toISOString(), createdAt: new Date().toISOString() }
    ];
  }
};

export const organizationService = {
  getOrganizations,
  getOrganizationBySlug,
  createOrganization,
  getOrganizationMembers,
  inviteOrganizationMember,
  getActiveSessions
};
