/**
 * Agent Workspace Controller — NexoApps Phase 8A
 */

const agentWorkspaceService = require('../services/agent_workspace.service');
const agentCollaborationService = require('../services/agent_collaboration.service');

const agentWorkspaceController = {
  async listWorkspaces(req, res) {
    try {
      const workspaces = await agentWorkspaceService.listWorkspaces(req.query.tenantId || 'default');
      res.json({ success: true, data: workspaces });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getWorkspace(req, res) {
    try {
      const workspace = await agentWorkspaceService.getWorkspace(req.params.id);
      res.json({ success: true, data: workspace });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createWorkspace(req, res) {
    try {
      const workspace = await agentWorkspaceService.createWorkspace(req.body);
      res.status(201).json({ success: true, data: workspace });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listWorkspaceAgents(req, res) {
    try {
      const agents = await agentWorkspaceService.listWorkspaceAgents(req.params.id);
      res.json({ success: true, data: agents });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async addAgentToWorkspace(req, res) {
    try {
      const agent = await agentWorkspaceService.addAgentToWorkspace(req.params.id, req.body);
      res.status(201).json({ success: true, data: agent });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listCollaborationSessions(req, res) {
    try {
      const sessions = await agentCollaborationService.listSessions(req.params.id);
      res.json({ success: true, data: sessions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getCollaborationConversations(req, res) {
    try {
      const conversations = await agentCollaborationService.getConversations(req.params.sessionId);
      res.json({ success: true, data: conversations });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = agentWorkspaceController;
