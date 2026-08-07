/**
 * Workspace Controller — NexoApps Phase 11D (v8.4)
 */

const workspaceService = require('../services/workspace.service');

class WorkspaceController {
  async getWorkspaces(req, res) {
    try {
      const workspaces = await workspaceService.getWorkspaces();
      res.json({ success: true, data: workspaces });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getWorkspaceById(req, res) {
    try {
      const workspace = await workspaceService.getWorkspaceById(req.params.id);
      res.json({ success: true, data: workspace });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createWorkspace(req, res) {
    try {
      const newWs = await workspaceService.createWorkspace(req.body);
      res.status(201).json({ success: true, data: newWs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getMembers(req, res) {
    try {
      const members = await workspaceService.getMembers(req.params.id || 'ws-main');
      res.json({ success: true, data: members });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async addMember(req, res) {
    try {
      const member = await workspaceService.addMember(
        req.params.id || 'ws-main',
        req.body.userId,
        req.body.role
      );
      res.status(201).json({ success: true, data: member });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new WorkspaceController();
