/**
 * Runtime Backup Controller — NexoApps Phase 8B
 */

const runtimeSnapshotService = require('../services/runtime_snapshot.service');
const runtimeBackupService = require('../services/runtime_backup.service');

const runtimeBackupController = {
  async listSnapshots(req, res) {
    try {
      const snapshots = await runtimeSnapshotService.listSnapshots(req.params.instanceId || 'all');
      res.json({ success: true, data: snapshots });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createSnapshot(req, res) {
    try {
      const snapshot = await runtimeSnapshotService.createSnapshot(req.params.instanceId, req.body.snapshotName);
      res.status(201).json({ success: true, data: snapshot });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listBackups(req, res) {
    try {
      const backups = await runtimeBackupService.listBackups(req.params.environmentId || 'all');
      res.json({ success: true, data: backups });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createBackup(req, res) {
    try {
      const backup = await runtimeBackupService.createBackup(req.params.environmentId, req.body.backupName);
      res.status(201).json({ success: true, data: backup });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = runtimeBackupController;
