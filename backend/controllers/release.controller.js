/**
 * Release Controller — NexoApps Phase 10E (v8.0)
 */

const releaseManagerService = require('../services/release_manager.service');
const backupManagerService = require('../services/backup_manager.service');

class ReleaseController {
  async getReleases(req, res) {
    try {
      const releases = await releaseManagerService.getReleases();
      res.json({ success: true, data: releases });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getBackups(req, res) {
    try {
      const backups = await backupManagerService.getBackups();
      res.json({ success: true, data: backups });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ReleaseController();
