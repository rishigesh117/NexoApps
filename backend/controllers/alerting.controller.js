/**
 * Alerting Controller — NexoApps Phase 12C (v9.3)
 */

const alertingService = require('../services/alerting.service');

class AlertingController {
  async getRules(req, res) {
    try {
      const rules = await alertingService.getAlertRules();
      res.json({ success: true, data: rules });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getEvents(req, res) {
    try {
      const events = await alertingService.getAlertEvents();
      res.json({ success: true, data: events });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createRule(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ success: false, error: 'Alert rule name is required' });
      }
      const rule = await alertingService.createAlertRule(req.body);
      res.status(201).json({ success: true, data: rule });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async updateRule(req, res) {
    try {
      const rule = await alertingService.updateAlertRule(req.params.id, req.body);
      if (!rule) {
        return res.status(404).json({ success: false, error: 'Alert rule not found' });
      }
      res.json({ success: true, data: rule });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async acknowledgeEvent(req, res) {
    try {
      const event = await alertingService.acknowledgeAlert(req.params.id);
      if (!event) {
        return res.status(404).json({ success: false, error: 'Alert event not found' });
      }
      res.json({ success: true, data: event });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async resolveEvent(req, res) {
    try {
      const event = await alertingService.resolveAlert(req.params.id);
      if (!event) {
        return res.status(404).json({ success: false, error: 'Alert event not found' });
      }
      res.json({ success: true, data: event });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new AlertingController();
