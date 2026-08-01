import { fetchApi } from './apiClient';
import { Organization, OrganizationMember, OrganizationInvitation } from '../types';

export async function getOrganizations(): Promise<Organization[]> {
  const res = await fetchApi<{ success: boolean; data: Organization[] }>('/organizations');
  return res.data || [];
}

export async function getOrganizationBySlug(slug: string): Promise<Organization | null> {
  const res = await fetchApi<{ success: boolean; data: Organization }>(`/organizations/slug/${slug}`);
  return res.data || null;
}

export async function createOrganization(data: Partial<Organization>): Promise<Organization> {
  const res = await fetchApi<{ success: boolean; data: Organization }>('/organizations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function getOrganizationMembers(orgId: string): Promise<OrganizationMember[]> {
  const res = await fetchApi<{ success: boolean; data: OrganizationMember[] }>(`/organizations/${orgId}/members`);
  return res.data || [];
}

export async function inviteOrganizationMember(orgId: string, email: string, role: string): Promise<OrganizationInvitation> {
  const res = await fetchApi<{ success: boolean; data: OrganizationInvitation }>(`/organizations/${orgId}/invitations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, role }),
  });
  return res.data;
}
