/**
 * Visual Editor Controller — NexoApps Phase 9B
 */

const visualEditorService = require('../services/visual_editor.service');
const workflowBuilderService = require('../services/workflow_builder.service');

const visualEditorController = {
  async getEditorSession(req, res) {
    try {
      const userId = req.user?.id || req.query.userId || 'user-owner';
      const session = await visualEditorService.getSession(req.params.applicationId, userId);
      res.json({ success: true, data: session });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async updateCursor(req, res) {
    try {
      const userId = req.user?.id || req.body.userId || 'user-owner';
      const session = await visualEditorService.updateCursor(req.params.applicationId, userId, req.body.cursorPosition);
      res.json({ success: true, data: session });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listWorkflows(req, res) {
    try {
      const workflows = await workflowBuilderService.listWorkflows(req.params.applicationId);
      res.json({ success: true, data: workflows });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async saveWorkflow(req, res) {
    try {
      const workflow = await workflowBuilderService.saveWorkflow({
        ...req.body,
        applicationId: req.params.applicationId
      });
      res.status(201).json({ success: true, data: workflow });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = visualEditorController;
