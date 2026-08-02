/**
 * Automation Center Service — NexoApps Phase 8D
 * Frontend API client for Process Automation Templates and Workflow Recipes.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const automationCenterService = {
  async listTemplates() {
    const res = await fetch(`${API_BASE}/automation-center/templates`);
    return res.json();
  },
  async deployTemplate(id: string) {
    const res = await fetch(`${API_BASE}/automation-center/deploy/${id}`, { method: 'POST' });
    return res.json();
  },
};
