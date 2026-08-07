/**
 * Resource Controller — NexoApps Phase 10B
 */

const resourceManagerService = require('../services/resource_manager.service');

class ResourceController {
  async getResourceGroups(req, res) {
    try {
      const groups = await resourceManagerService.getResourceGroups();
      res.json({ success: true, data: groups });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAllocations(req, res) {
    try {
      const allocations = await resourceManagerService.getAllocations();
      res.json({ success: true, data: allocations });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ResourceController();
