/**
 * Agent Workspace Service — NexoApps Phase 8A
 * Frontend API client for Multi-Agent Workspaces & Collaboration Sessions.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const agentWorkspaceService = {
  async listWorkspaces() {
    const res = await fetch(`${API_BASE}/agent-workspace`);
    return res.json();
  },
  async getWorkspace(id: string) {
    const res = await fetch(`${API_BASE}/agent-workspace/${id}`);
    return res.json();
  },
  async createWorkspace(data: any) {
    const res = await fetch(`${API_BASE}/agent-workspace`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listWorkspaceAgents(workspaceId: string) {
    const res = await fetch(`${API_BASE}/agent-workspace/${workspaceId}/agents`);
    return res.json();
  },
  async addAgentToWorkspace(workspaceId: string, data: any) {
    const res = await fetch(`${API_BASE}/agent-workspace/${workspaceId}/agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listCollaborationSessions(workspaceId: string) {
    const res = await fetch(`${API_BASE}/agent-workspace/${workspaceId}/collaboration-sessions`);
    return res.json();
  },
  async getCollaborationConversations(sessionId: string) {
    const res = await fetch(`${API_BASE}/agent-workspace/sessions/${sessionId}/conversations`);
    return res.json();
  },
};
