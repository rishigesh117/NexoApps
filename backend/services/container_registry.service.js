/**
 * Container Registry Service — NexoApps Phase 11A (v8.1)
 * Private Docker/OCI container image registry and vulnerability scanner.
 */

class ContainerRegistryService {
  constructor() {
    this.registries = [
      { id: 'cr-1', orgId: 'org-dev-1', registryName: 'NexoApps Private Container Registry', registryUrl: 'cr.nexoapps.internal', createdAt: new Date().toISOString() }
    ];
    this.images = [
      { id: 'img-101', registryId: 'cr-1', imageName: 'nexoapps/api-gateway', tag: 'v8.1.0-latest', sizeBytes: 184000000, pushedAt: new Date().toISOString() },
      { id: 'img-102', registryId: 'cr-1', imageName: 'nexoapps/ai-runtime-kernel', tag: 'v8.1.0-cuda12', sizeBytes: 2450000000, pushedAt: new Date().toISOString() }
    ];
  }

  async getRegistries() {
    return this.registries;
  }

  async getImages() {
    return this.images;
  }
}

module.exports = new ContainerRegistryService();
