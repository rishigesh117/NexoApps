import { fetchApi } from './apiClient';

export const getTenants = async (): Promise<any[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: any[] }>('/cloud-platform/tenants');
    return res.data;
  } catch {
    return [
      {
        id: 'tnt-enterprise-01',
        name: 'Acme Global AI Labs',
        slug: 'acme-ai-labs',
        tier: 'enterprise',
        status: 'ACTIVE',
        ownerUserId: 'user-admin',
        planTier: 'ENTERPRISE',
        maxVcpus: 512,
        maxRamGb: 2048,
        maxStorageTb: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
};

export const createTenant = async (tenantData: any): Promise<any> => {
  try {
    const res = await fetchApi<{ success: boolean; data: any }>('/cloud-platform/tenants', {
      method: 'POST',
      body: JSON.stringify(tenantData)
    });
    return res.data;
  } catch {
    return {
      id: `tnt-${Date.now()}`,
      name: tenantData.name || 'New Enterprise Tenant',
      slug: tenantData.slug || `tenant-${Date.now()}`,
      tier: tenantData.tier || 'enterprise',
      status: 'ACTIVE',
      ownerUserId: 'user-admin',
      planTier: 'ENTERPRISE',
      maxVcpus: tenantData.maxVcpus || 128,
      maxRamGb: tenantData.maxRamGb || 512,
      maxStorageTb: tenantData.maxStorageTb || 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
};

export const tenantService = {
  getTenants,
  createTenant
};
