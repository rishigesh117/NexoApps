/**
 * Resource Registry Service — NexoApps Phase 12E (v9.5)
 */

class ResourceRegistryService {
  constructor() {
    this.resourceTypes = [
      { id: 'rtype-k8s', typeName: 'Kubernetes Cluster (EKS/GKE/AKS)', category: 'k8s_cluster', createdAt: new Date().toISOString() },
      { id: 'rtype-db', typeName: 'Managed PostgreSQL Database Cluster', category: 'database', createdAt: new Date().toISOString() },
      { id: 'rtype-vm', typeName: 'Virtual Machine Compute Node', category: 'compute', createdAt: new Date().toISOString() },
      { id: 'rtype-store', typeName: 'Object Storage Bucket (S3/GCS)', category: 'storage', createdAt: new Date().toISOString() },
    ];
  }

  async getResourceTypes() {
    return this.resourceTypes;
  }
}

module.exports = new ResourceRegistryService();
