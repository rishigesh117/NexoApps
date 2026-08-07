/**
 * Identity Service — NexoApps Phase 10D
 * Single Sign-On (SSO), SAML 2.0, OIDC, and Identity Providers.
 */

class IdentityService {
  constructor() {
    this.providers = [
      { id: 'idp-101', name: 'Okta Enterprise SSO', providerType: 'saml', clientId: 'okta-nexo-client-id', issuerUrl: 'https://nexo.okta.com', isEnabled: true, createdAt: new Date().toISOString() },
      { id: 'idp-102', name: 'Azure Active Directory OIDC', providerType: 'oidc', clientId: 'azure-ad-client-id', issuerUrl: 'https://login.microsoftonline.com/nexo-tenant', isEnabled: true, createdAt: new Date().toISOString() }
    ];
  }

  async getIdentityProviders() {
    return this.providers;
  }
}

module.exports = new IdentityService();
