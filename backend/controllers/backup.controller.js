/**
 * Backup Controller — NexoApps Phase 12B (v9.2)
 */

const backupService = require('../services/backup.service');

class DatabaseBackupController {
  async getBackups(req, res) {
    try {
      const policies = await backupService.getPolicies();
      const jobs = await backupService.getJobs();
      res.json({ success: true, data: { policies, jobs } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new DatabaseBackupController();
