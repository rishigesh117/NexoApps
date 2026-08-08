/**
 * Cloud Resource Service — NexoApps Phase 12E (v9.5)
 */

class CloudResourceService {
  constructor() {
    this.resources = [
      { id: 'cres-1', accountId: 'cacc-1', regionId: 'creg-1', resourceTypeId: 'rtype-k8s', resourceName: 'prod-us-east-1-k8s-cluster', providerResourceId: 'arn:aws:eks:us-east-1:123456789012:cluster/prod-us-east-1', status: 'running', createdAt: new Date().toISOString() },
      { id: 'cres-2', accountId: 'cacc-2', regionId: 'creg-2', resourceTypeId: 'rtype-db', resourceName: 'prod-eu-central-1-pg-cluster', providerResourceId: 'projects/nexoapps-ai-prod/instances/pg-eu-01', status: 'running', createdAt: new Date().toISOString() },
    ];
  }

  async getResources() {
    return this.resources;
  }

  async createResource(data) {
    const res = {
      id: `cres-${Date.now()}`,
      accountId: data.accountId || 'cacc-1',
      regionId: data.regionId || 'creg-1',
      resourceTypeId: data.resourceTypeId || 'rtype-k8s',
      resourceName: data.resourceName,
      providerResourceId: data.providerResourceId || `id-${Date.now()}`,
      status: 'running',
      createdAt: new Date().toISOString(),
    };
    this.resources.push(res);
    return res;
  }
}

module.exports = new CloudResourceService();
