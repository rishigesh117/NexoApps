/**
 * Cloud Controller — NexoApps Phase 10B
 */

const cloudRegionService = require('../services/cloud_region.service');
const cloudMonitorService = require('../services/cloud_monitor.service');
const capacityPlannerService = require('../services/capacity_planner.service');

class CloudController {
  async getRegions(req, res) {
    try {
      const regions = await cloudRegionService.getRegions();
      res.json({ success: true, data: regions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getHealth(req, res) {
    try {
      const health = await cloudMonitorService.getHealth();
      res.json({ success: true, data: health });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getCapacityPlans(req, res) {
    try {
      const plans = await capacityPlannerService.getPlans();
      res.json({ success: true, data: plans });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new CloudController();
