/**
 * Software Project Service — NexoApps Phase 9D
 * Frontend API service for autonomous software projects & developer assistant.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const softwareProjectService = {
  async listProjects() {
    const res = await fetch(`${API_BASE}/software-engineering/core/projects`);
    return res.json();
  },

  async getProjectById(id: string) {
    const res = await fetch(`${API_BASE}/software-engineering/core/projects/${id}`);
    return res.json();
  },

  async createProject(data: any) {
    const res = await fetch(`${API_BASE}/software-engineering/core/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async askAssistant(projectId: string, prompt: string) {
    const res = await fetch(`${API_BASE}/software-engineering/core/projects/${projectId}/assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    return res.json();
  },
};
