/**
 * Version Management & Rollback Service
 * NexoApps Platform - Phase 4B
 */

class VersionService {
  constructor() {
    this.versionsMap = new Map();
  }

  getVersionsForApp(appId) {
    if (!this.versionsMap.has(appId)) {
      this.versionsMap.set(appId, [
        {
          id: `ver-${appId}-2.0`,
          appId,
          versionName: '2.0.0',
          buildNumber: 2,
          releaseDate: '2026-07-28',
          releaseNotes: 'Major update with enhanced UI glass contrast and performance pipeline.',
          bugFixes: 'Resolved tablet viewport alignment issue.',
          knownIssues: 'None',
          apkFile: `app-v2.0.0.apk`,
          apkChecksum: 'sha256_e3b0c44298fc1c149afbf4c8996fb924',
          isActive: true,
        },
        {
          id: `ver-${appId}-1.0`,
          appId,
          versionName: '1.0.0',
          buildNumber: 1,
          releaseDate: '2026-07-01',
          releaseNotes: 'Initial production release for NexoApps store.',
          bugFixes: 'Initial build',
          knownIssues: 'None',
          apkFile: `app-v1.0.0.apk`,
          apkChecksum: 'sha256_7f83b1657ff1fc53b92dc18148a1d65d',
          isActive: false,
        },
      ]);
    }
    return this.versionsMap.get(appId);
  }

  addVersionRecord(appId, versionData) {
    const versions = this.getVersionsForApp(appId);
    
    // Mark previous active version inactive
    versions.forEach((v) => { v.isActive = false; });

    const newRecord = {
      id: `ver-${appId}-${Date.now()}`,
      appId,
      versionName: versionData.versionName || versionData.version || '1.0.0',
      buildNumber: Number(versionData.buildNumber) || versions.length + 1,
      releaseDate: versionData.releaseDate || new Date().toISOString().split('T')[0],
      releaseNotes: versionData.releaseNotes || 'Production update.',
      bugFixes: versionData.bugFixes || '',
      knownIssues: versionData.knownIssues || '',
      apkFile: versionData.apkFile || `${appId}-v${versionData.versionName || '1.0.0'}.apk`,
      apkChecksum: versionData.apkChecksum || `sha256_${Date.now()}`,
      isActive: true,
    };

    versions.unshift(newRecord);
    return newRecord;
  }

  rollbackToVersion(appId, versionId) {
    const versions = this.getVersionsForApp(appId);
    const target = versions.find((v) => v.id === versionId);
    if (!target) throw new Error('Target version record not found');

    versions.forEach((v) => { v.isActive = false; });
    target.isActive = true;

    return {
      message: `Successfully rolled back application to v${target.versionName} (Build #${target.buildNumber})`,
      activeVersion: target,
    };
  }
}

module.exports = new VersionService();
