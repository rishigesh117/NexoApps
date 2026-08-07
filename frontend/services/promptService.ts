/**
 * Prompt Service — NexoApps Phase 9A
 * Frontend API service for prompt templates and version governance.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const promptService = {
  async listTemplates() {
    const res = await fetch(`${API_BASE}/ai-gateway/prompts/templates`);
    return res.json();
  },

  async getTemplateById(id: string) {
    const res = await fetch(`${API_BASE}/ai-gateway/prompts/templates/${id}`);
    return res.json();
  },

  async createTemplate(data: any) {
    const res = await fetch(`${API_BASE}/ai-gateway/prompts/templates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async addVersion(templateId: string, data: any) {
    const res = await fetch(`${API_BASE}/ai-gateway/prompts/templates/${templateId}/versions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
