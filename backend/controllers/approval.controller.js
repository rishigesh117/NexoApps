/**
 * Approval Controller — NexoApps Phase 8D
 */

const approvalService = require('../services/approval.service');

const approvalController = {
  async listRequests(req, res) {
    try {
      const requests = await approvalService.listRequests(req.params.approverId || 'all');
      res.json({ success: true, data: requests });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async resolveRequest(req, res) {
    try {
      const result = await approvalService.resolveRequest(req.params.id, req.body.decision);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = approvalController;
