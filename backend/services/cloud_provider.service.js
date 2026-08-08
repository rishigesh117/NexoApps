/**
 * Cloud Provider Service — NexoApps Phase 12E (v9.5)
 */

class CloudProviderService {
  constructor() {
    this.providers = [
      { id: 'cprov-aws', providerName: 'Amazon Web Services (AWS)', providerType: 'public_cloud', status: 'active', createdAt: new Date().toISOString() },
      { id: 'cprov-gcp', providerName: 'Google Cloud Platform (GCP)', providerType: 'public_cloud', status: 'active', createdAt: new Date().toISOString() },
      { id: 'cprov-azure', providerName: 'Microsoft Azure', providerType: 'public_cloud', status: 'active', createdAt: new Date().toISOString() },
      { id: 'cprov-onprem', providerName: 'NexoApps Private Datacenter', providerType: 'on_prem', status: 'active', createdAt: new Date().toISOString() },
    ];
  }

  async getProviders() {
    return this.providers;
  }

  async createProvider(data) {
    const prov = {
      id: `cprov-${Date.now()}`,
      providerName: data.providerName,
      providerType: data.providerType || 'public_cloud',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.providers.push(prov);
    return prov;
  }
}

module.exports = new CloudProviderService();
