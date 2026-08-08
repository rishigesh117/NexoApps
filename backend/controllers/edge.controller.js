/**
 * Edge Controller — NexoApps Phase 12D (v9.4)
 */

const edgeLocationService = require('../services/edge_location.service');
const globalRoutingService = require('../services/global_routing.service');

class EdgeController {
  async getLocations(req, res) {
    try {
      const locations = await edgeLocationService.getLocations();
      res.json({ success: true, data: locations });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getNodes(req, res) {
    try {
      const nodes = await edgeLocationService.getNodes(req.query.locationId);
      res.json({ success: true, data: nodes });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createLocation(req, res) {
    try {
      const { locationCode, locationName } = req.body;
      if (!locationCode || !locationName) {
        return res.status(400).json({ success: false, error: 'locationCode and locationName are required' });
      }
      const loc = await edgeLocationService.createLocation(req.body);
      res.status(201).json({ success: true, data: loc });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getGlobalRoutes(req, res) {
    try {
      const routes = await globalRoutingService.getGlobalRoutes();
      res.json({ success: true, data: routes });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createGlobalRoute(req, res) {
    try {
      const { domainName } = req.body;
      if (!domainName) return res.status(400).json({ success: false, error: 'domainName is required' });
      const route = await globalRoutingService.createGlobalRoute(req.body);
      res.status(201).json({ success: true, data: route });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new EdgeController();
