import { fetchApi } from './apiClient';
import { IdentityProvider, Role } from '../../shared/types';

export const identityService = {
  getProviders: async (): Promise<IdentityProvider[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: IdentityProvider[] }>('/security/identity/providers');
      return res.data;
    } catch {
      return [
        { id: 'idp-101', name: 'Okta Enterprise SSO', providerType: 'saml', clientId: 'okta-nexo-client-id', issuerUrl: 'https://nexo.okta.com', isEnabled: true, createdAt: new Date().toISOString() },
        { id: 'idp-102', name: 'Azure Active Directory OIDC', providerType: 'oidc', clientId: 'azure-ad-client-id', issuerUrl: 'https://login.microsoftonline.com/nexo-tenant', isEnabled: true, createdAt: new Date().toISOString() }
      ];
    }
  },

  getRoles: async (): Promise<Role[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: Role[] }>('/security/identity/roles');
      return res.data;
    } catch {
      return [
        { id: 'role-admin', roleName: 'Global Security Admin', description: 'Full administrative access across security platform', isSystemRole: true, createdAt: new Date().toISOString() },
        { id: 'role-auditor', roleName: 'Compliance Auditor', description: 'Read-only access to audit logs and compliance controls', isSystemRole: true, createdAt: new Date().toISOString() }
      ];
    }
  }
};
