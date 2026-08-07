/**
 * Environment Service — NexoApps Phase 11A (v8.1)
 * Multi-environment (Dev/Staging/Prod) orchestration and configuration.
 */

class EnvironmentService {
  constructor() {
    this.environments = [
      { id: 'env-dev', orgId: 'org-dev-1', envName: 'Development', envType: 'development', createdAt: new Date().toISOString() },
      { id: 'env-stage', orgId: 'org-dev-1', envName: 'Staging Integration Sandbox', envType: 'staging', createdAt: new Date().toISOString() },
      { id: 'env-prod', orgId: 'org-dev-1', envName: 'Global Production Cloud', envType: 'production', createdAt: new Date().toISOString() }
    ];
  }

  async getEnvironments() {
    return this.environments;
  }
}

module.exports = new EnvironmentService();
