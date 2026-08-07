/**
 * Storage Service — NexoApps Phase 12A (v9.1)
 * Object storage providers, S3-compatible buckets, and object explorer.
 */

class StorageInfrastructureService {
  constructor() {
    this.providers = [
      { id: 'sp-1', providerName: 'AWS S3 Cloud Storage', providerType: 's3_compatible', status: 'active', createdAt: new Date().toISOString() }
    ];

    this.buckets = [
      { id: 'sb-1', providerId: 'sp-1', bucketName: 'nexo-production-assets', region: 'us-east-1', createdAt: new Date().toISOString() },
      { id: 'sb-2', providerId: 'sp-1', bucketName: 'nexo-modelops-artifacts', region: 'us-east-1', createdAt: new Date().toISOString() }
    ];

    this.objects = [
      { id: 'so-1', bucketId: 'sb-1', objectKey: 'builds/v9.1-production-bundle.tar.gz', sizeBytes: 524288000, contentType: 'application/gzip', uploadedAt: new Date().toISOString() }
    ];
  }

  async getProviders() {
    return this.providers;
  }

  async getBuckets() {
    return this.buckets;
  }

  async getObjects() {
    return this.objects;
  }
}

module.exports = new StorageInfrastructureService();
