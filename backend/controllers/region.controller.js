/**
 * Region Controller — NexoApps Phase 12E (v9.5)
 */

const cloudRegionService = require('../services/cloud_region.service');
const regionHealthService = require('../services/region_health.service');
const resourceManagerService = require('../services/resource_manager.service');

class RegionController {
  async getRegions(req, res) {
    try {
      const regions = await cloudRegionService.getRegions();
      res.json({ success: true, data: regions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createRegion(req, res) {
    try {
      const { regionCode, regionName } = req.body;
      if (!regionCode || !regionName) return res.status(400).json({ success: false, error: 'regionCode and regionName are required' });
      const region = await cloudRegionService.createRegion(req.body);
      res.status(201).json({ success: true, data: region });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getZones(req, res) {
    try {
      const zones = await cloudRegionService.getZones(req.query.regionId);
      res.json({ success: true, data: zones });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getRegionHealth(req, res) {
    try {
      const health = await regionHealthService.getHealthStatus();
      res.json({ success: true, data: health });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getRegionCapacity(req, res) {
    try {
      const capacity = await resourceManagerService.getCapacity(req.query.regionId);
      res.json({ success: true, data: capacity });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new RegionController();
