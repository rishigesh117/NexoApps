/**
 * Gateway Controller — NexoApps Phase 12D (v9.4)
 */

const apiGatewayService = require('../services/api_gateway.service');
const gatewayInstanceService = require('../services/gateway_instance.service');

class GatewayController {
  async getGateways(req, res) {
    try {
      const gateways = await apiGatewayService.getGateways();
      res.json({ success: true, data: gateways });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getGatewayById(req, res) {
    try {
      const gateway = await apiGatewayService.getGatewayById(req.params.id);
      if (!gateway) return res.status(404).json({ success: false, error: 'Gateway not found' });
      const instances = await gatewayInstanceService.getInstances(req.params.id);
      res.json({ success: true, data: { ...gateway, instances } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createGateway(req, res) {
    try {
      const { gatewayName } = req.body;
      if (!gatewayName) return res.status(400).json({ success: false, error: 'gatewayName is required' });
      const gateway = await apiGatewayService.createGateway(req.body);
      res.status(201).json({ success: true, data: gateway });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getInstances(req, res) {
    try {
      const instances = await gatewayInstanceService.getInstances(req.query.gatewayId);
      res.json({ success: true, data: instances });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new GatewayController();
