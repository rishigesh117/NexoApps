/**
 * Workspace OS Service — NexoApps Phase 9E
 * Frontend API service for AI OS unified workspace, navigation & recommendations.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const workspaceOsService = {
  async getActiveWorkspace() {
    const res = await fetch(`${API_BASE}/ai-os/workspace/active`);
    return res.json();
  },

  async getNavigation() {
    const res = await fetch(`${API_BASE}/ai-os/workspace/navigation`);
    return res.json();
  },

  async getRecommendations() {
    const res = await fetch(`${API_BASE}/ai-os/workspace/recommendations`);
    return res.json();
  },

  async listActivities() {
    const res = await fetch(`${API_BASE}/ai-os/workspace/activities`);
    return res.json();
  },
};
