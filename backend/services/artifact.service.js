/**
 * Artifact Service — NexoApps Phase 11A (v8.1)
 * Build output artifacts, NPM/PyPI/Helm package registry orchestration.
 */

class ArtifactService {
  constructor() {
    this.artifacts = [
      { id: 'art-101', runId: 'run-901', artifactName: 'nexoapps-bundle-v8.1.0.tgz', fileSize: 48200000, downloadUrl: 'https://cdn.nexoapps.internal/artifacts/bundle-v8.1.0.tgz', createdAt: new Date().toISOString() }
    ];
    this.packages = [
      { id: 'pkg-1', orgId: 'org-dev-1', packageName: '@nexoapps/sdk', packageType: 'npm', version: '8.1.0', createdAt: new Date().toISOString() }
    ];
  }

  async getArtifacts() {
    return this.artifacts;
  }

  async getPackages() {
    return this.packages;
  }
}

module.exports = new ArtifactService();
