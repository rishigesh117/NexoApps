/**
 * Cloud Backup & Restore Service
 * NexoApps Platform - Phase 5C
 */

class BackupService {
  constructor() {
    this.backups = [
      {
        id: 'bkp-1001',
        userId: 'usr-1',
        backupName: 'Full Account Snapshot v1.0.0-rc1',
        version: 'v1.0.0',
        sizeBytes: 15520000,
        encryptionHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        isAutoBackup: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'bkp-1002',
        userId: 'usr-1',
        backupName: 'Pre-Phase 5C Migration Backup',
        version: 'v1.0.0',
        sizeBytes: 14200000,
        encryptionHash: 'sha256:8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
        isAutoBackup: false,
        createdAt: new Date(Date.now() - 259200000).toISOString(),
      },
    ];
  }

  getBackups(userId) {
    return this.backups;
  }

  createBackup(userId, backupName = 'Manual Cloud Snapshot') {
    const newBackup = {
      id: `bkp-${Date.now()}`,
      userId: userId || 'usr-1',
      backupName,
      version: 'v1.0.0',
      sizeBytes: Math.floor(14000000 + Math.random() * 2000000),
      encryptionHash: `sha256:${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      isAutoBackup: false,
      createdAt: new Date().toISOString(),
    };
    this.backups.unshift(newBackup);
    return newBackup;
  }

  restoreBackup(backupId) {
    const backup = this.backups.find((b) => b.id === backupId);
    if (!backup) throw new Error('Backup snapshot not found');
    return {
      restored: true,
      backup,
      restoredAt: new Date().toISOString(),
    };
  }
}

module.exports = new BackupService();
