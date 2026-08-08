/**
 * Cloud Account Service — NexoApps Phase 12E (v9.5)
 */

class CloudAccountService {
  constructor() {
    this.accounts = [
      { id: 'cacc-1', providerId: 'cprov-aws', accountName: 'NexoApps Prod AWS Master', accountIdNumber: '123456789012', environment: 'production', status: 'connected', createdAt: new Date().toISOString() },
      { id: 'cacc-2', providerId: 'cprov-gcp', accountName: 'NexoApps AI ModelOps GCP Project', accountIdNumber: 'nexoapps-ai-prod', environment: 'production', status: 'connected', createdAt: new Date().toISOString() },
    ];
  }

  async getAccounts() {
    return this.accounts;
  }

  async createAccount(data) {
    const acc = {
      id: `cacc-${Date.now()}`,
      providerId: data.providerId || 'cprov-aws',
      accountName: data.accountName,
      accountIdNumber: data.accountIdNumber || `${Date.now()}`,
      environment: data.environment || 'production',
      status: 'connected',
      createdAt: new Date().toISOString(),
    };
    this.accounts.push(acc);
    return acc;
  }
}

module.exports = new CloudAccountService();
