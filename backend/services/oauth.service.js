/**
 * OAuth2 Server Service
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

class OAuthService {
  constructor() {
    this.applications = [
      {
        id: 'oauth-app-1',
        developerId: 'usr-1',
        name: 'Batlytics Mobile Companion',
        clientId: 'nx_client_batlytics_9482',
        clientSecret: 'nx_secret_8492048291048',
        redirectUris: ['https://batlytics.dev/oauth/callback'],
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      },
    ];
  }

  getApplications() {
    return this.applications;
  }
}

module.exports = new OAuthService();
