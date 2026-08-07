/**
 * Collaboration Service — NexoApps Phase 9B
 * Frontend API service for multi-user editing, team permissions, and workspace logs.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const collaborationService = {
  async listCollaborators(applicationId: string) {
    const res = await fetch(`${API_BASE}/app-builder/collaborators/${applicationId}`);
    return res.json();
  },

  async addCollaborator(applicationId: string, userId: string, role = 'editor') {
    const res = await fetch(`${API_BASE}/app-builder/collaborators/${applicationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role }),
    });
    return res.json();
  },

  async listActivityLogs(applicationId: string) {
    const res = await fetch(`${API_BASE}/app-builder/activity/${applicationId}`);
    return res.json();
  },
};
