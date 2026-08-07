/**
 * Storage Service — NexoApps Phase 10B
 * NVMe SSD block volumes, object storage S3-compatible buckets, and data persistence.
 */

class StorageService {
  constructor() {
    this.volumes = [
      { id: 'vol-101', tenantId: 'tnt-enterprise-01', vmId: 'vm-1001', name: 'model-weights-nvme', sizeGb: 2000, volumeType: 'nvme_ssd', status: 'attached', createdAt: new Date().toISOString() }
    ];
    this.buckets = [
      { id: 'bkt-1', tenantId: 'tnt-enterprise-01', regionId: 'reg-1', bucketName: 'nexo-ai-datasets-prod', accessLevel: 'private', storageClass: 'standard', createdAt: new Date().toISOString() }
    ];
  }

  async getVolumes(tenantId = 'tnt-enterprise-01') {
    return this.volumes.filter(v => v.tenantId === tenantId);
  }

  async getBuckets(tenantId = 'tnt-enterprise-01') {
    return this.buckets.filter(b => b.tenantId === tenantId);
  }
}

module.exports = new StorageService();
