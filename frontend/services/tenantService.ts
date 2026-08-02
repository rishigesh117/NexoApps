import { fetchApi } from './apiClient';
import { Tenant, TenantBranding, TenantDomain } from '../types';

export async function getTenants(): Promise<Tenant[]> {
  const res = await fetchApi<{ success: boolean; data: Tenant[] }>('/tenant');
  return res.data || [];
}

export async function createTenant(data: Partial<Tenant>): Promise<Tenant> {
  const res = await fetchApi<{ success: boolean; data: Tenant }>('/tenant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function getTenantBranding(tenantId: string): Promise<TenantBranding> {
  const res = await fetchApi<{ success: boolean; data: TenantBranding }>(`/tenant/${tenantId}/branding`);
  return res.data;
}

export async function getTenantDomains(tenantId: string): Promise<TenantDomain[]> {
  const res = await fetchApi<{ success: boolean; data: TenantDomain[] }>(`/tenant/${tenantId}/domains`);
  return res.data || [];
}
