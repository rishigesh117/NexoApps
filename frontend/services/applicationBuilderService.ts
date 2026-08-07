/**
 * Application Builder Service — NexoApps Phase 9B
 * Frontend API service for low-code applications.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const applicationBuilderService = {
  async listApplications(ownerId?: string) {
    const query = ownerId ? `?ownerId=${ownerId}` : '';
    const res = await fetch(`${API_BASE}/app-builder/applications${query}`);
    return res.json();
  },

  async getApplicationById(id: string) {
    const res = await fetch(`${API_BASE}/app-builder/applications/${id}`);
    return res.json();
  },

  async createApplication(data: any) {
    const res = await fetch(`${API_BASE}/app-builder/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async addComponent(applicationId: string, data: any) {
    const res = await fetch(`${API_BASE}/app-builder/applications/${applicationId}/components`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getAnalytics() {
    const res = await fetch(`${API_BASE}/app-builder/applications/analytics`);
    return res.json();
  },
};
