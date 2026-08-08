/**
 * Resource Controller — NexoApps Phase 12E (v9.5)
 */

const cloudResourceService = require('../services/cloud_resource.service');
const resourceRegistryService = require('../services/resource_registry.service');

class ResourceController {
  async getResources(req, res) {
    try {
      const resources = await cloudResourceService.getResources();
      res.json({ success: true, data: resources });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createResource(req, res) {
    try {
      const { resourceName } = req.body;
      if (!resourceName) return res.status(400).json({ success: false, error: 'resourceName is required' });
      const resource = await cloudResourceService.createResource(req.body);
      res.status(201).json({ success: true, data: resource });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getResourceTypes(req, res) {
    try {
      const types = await resourceRegistryService.getResourceTypes();
      res.json({ success: true, data: types });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ResourceController();
