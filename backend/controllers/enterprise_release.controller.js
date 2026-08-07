/**
 * Enterprise Release Controller — NexoApps Phase 11E (v9.0)
 */

const releaseService = require('../services/enterprise_release.service');
const backupService = require('../services/enterprise_backup.service');

class EnterpriseReleaseController {
  async getReleases(req, res) {
    try {
      const releases = await releaseService.getReleases();
      res.json({ success: true, data: releases });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getBackups(req, res) {
    try {
      const backups = await backupService.getBackups();
      const restorePoints = await backupService.getRestorePoints();
      res.json({ success: true, data: { backups, restorePoints } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createBackup(req, res) {
    try {
      const bk = await backupService.createBackup(req.body.backupName);
      res.status(201).json({ success: true, data: bk });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new EnterpriseReleaseController();
