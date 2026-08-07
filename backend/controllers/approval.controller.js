/**
 * Approval Controller — NexoApps Phase 11C
 * Version 8.3
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
      const result = await approvalService.resolveRequest(req.params.id, req.body.decision, req.body.comment);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listWorkflows(req, res) {
    try {
      const workflows = await approvalService.listWorkflows();
      res.json({ success: true, data: workflows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createApprovalRequest(req, res) {
    try {
      const request = await approvalService.createApprovalRequest(req.body);
      res.status(201).json({ success: true, data: request });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async recordAction(req, res) {
    try {
      const action = await approvalService.recordAction(req.params.id, req.body.approverId, req.body.action, req.body.comment);
      res.json({ success: true, data: action });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = approvalController;
