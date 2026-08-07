/**
 * Enterprise Support Controller — NexoApps Phase 11E (v9.0)
 */

const supportService = require('../services/enterprise_support.service');

class EnterpriseSupportController {
  async getSupportCases(req, res) {
    try {
      const cases = await supportService.getSupportCases();
      res.json({ success: true, data: cases });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createSupportCase(req, res) {
    try {
      const sc = await supportService.createSupportCase(req.body);
      res.status(201).json({ success: true, data: sc });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new EnterpriseSupportController();
