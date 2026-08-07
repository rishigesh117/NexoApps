/**
 * Application Versioning Service — NexoApps Phase 9B
 * Version timeline, snapshots, rollbacks, and release tagging.
 */

const { v4: uuidv4 } = require('uuid');

class ApplicationVersioningService {
  constructor() {
    this.versions = [
      { id: 'ver-1', applicationId: 'app-demo-1', versionNumber: '1.0.0', changelog: 'Initial MVP release', snapshotPayload: '{}', createdBy: 'user-owner', createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: 'ver-2', applicationId: 'app-demo-1', versionNumber: '1.1.0', changelog: 'Added RAG connector block', snapshotPayload: '{}', createdBy: 'user-owner', createdAt: new Date(Date.now() - 43200000).toISOString() },
      { id: 'ver-3', applicationId: 'app-demo-1', versionNumber: '1.2.0', changelog: 'Integrated voice AI & multi-model selector', snapshotPayload: '{}', createdBy: 'user-owner', createdAt: new Date().toISOString() }
    ];

    this.releases = [
      { id: 'rel-1', applicationId: 'app-demo-1', releaseTag: 'v1.2.0', title: 'Version 1.2.0 Stable Release', description: 'Production release with full AI Gateway integration.', isLatest: true, releasedAt: new Date().toISOString() }
    ];
  }

  async listVersions(applicationId) {
    if (applicationId) return this.versions.filter(v => v.applicationId === applicationId);
    return this.versions;
  }

  async createVersion(applicationId, data) {
    const existing = this.versions.filter(v => v.applicationId === applicationId);
    const nextVerNum = `1.${existing.length}.0`;
    const ver = {
      id: `ver-${uuidv4().substring(0, 8)}`,
      applicationId,
      versionNumber: data.versionNumber || nextVerNum,
      changelog: data.changelog || 'Minor update',
      snapshotPayload: JSON.stringify(data.snapshotPayload || {}),
      createdBy: data.createdBy || 'user-owner',
      createdAt: new Date().toISOString()
    };
    this.versions.push(ver);
    return ver;
  }

  async listReleases(applicationId) {
    if (applicationId) return this.releases.filter(r => r.applicationId === applicationId);
    return this.releases;
  }
}

module.exports = new ApplicationVersioningService();
