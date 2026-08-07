/**
 * Visual Editor Service — NexoApps Phase 9B
 * Frontend API service for visual canvas sessions & workflow editing.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const visualEditorService = {
  async getSession(applicationId: string) {
    const res = await fetch(`${API_BASE}/app-builder/editor/session/${applicationId}`);
    return res.json();
  },

  async updateCursor(applicationId: string, cursorPosition: { x: number; y: number }) {
    const res = await fetch(`${API_BASE}/app-builder/editor/cursor/${applicationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cursorPosition }),
    });
    return res.json();
  },

  async listWorkflows(applicationId: string) {
    const res = await fetch(`${API_BASE}/app-builder/editor/workflows/${applicationId}`);
    return res.json();
  },

  async saveWorkflow(applicationId: string, data: any) {
    const res = await fetch(`${API_BASE}/app-builder/editor/workflows/${applicationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
