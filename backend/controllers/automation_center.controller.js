/**
 * Automation Center Controller — NexoApps Phase 8D
 */

const automationCenterService = require('../services/automation_center.service');

const automationCenterController = {
  async listTemplates(req, res) {
    try {
      const templates = await automationCenterService.listTemplates();
      res.json({ success: true, data: templates });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async deployTemplate(req, res) {
    try {
      const result = await automationCenterService.deployTemplate(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = automationCenterController;
