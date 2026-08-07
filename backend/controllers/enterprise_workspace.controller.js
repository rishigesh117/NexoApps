/**
 * Enterprise Workspace Controller — NexoApps Phase 11E (v9.0)
 */

const workspaceService = require('../services/enterprise_workspace.service');

class EnterpriseWorkspaceController {
  async getWorkspaces(req, res) {
    try {
      const workspaces = await workspaceService.getWorkspaces();
      res.json({ success: true, data: workspaces });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createWorkspace(req, res) {
    try {
      const ws = await workspaceService.createWorkspace(req.body);
      res.status(201).json({ success: true, data: ws });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new EnterpriseWorkspaceController();
