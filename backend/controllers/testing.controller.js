/**
 * Testing Controller — NexoApps Phase 9D
 */

const testingService = require('../services/testing.service');

const testingController = {
  async runTests(req, res) {
    try {
      const results = await testingService.runTests(req.params.id);
      res.json({ success: true, data: results });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = testingController;
