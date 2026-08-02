/**
 * Release Controller — NexoApps Phase 8E
 */

const releaseManagerService = require('../services/release_manager.service');

const releaseController = {
  async getReleaseInformation(req, res) {
    try {
      const info = await releaseManagerService.getReleaseInformation();
      res.json({ success: true, data: info });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = releaseController;
