/**
 * Restore Controller — NexoApps Phase 12B (v9.2)
 */

const restoreService = require('../services/restore.service');

class DatabaseRestoreController {
  async getRestores(req, res) {
    try {
      const points = await restoreService.getRestorePoints();
      const jobs = await restoreService.getRestoreJobs();
      res.json({ success: true, data: { points, jobs } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new DatabaseRestoreController();
