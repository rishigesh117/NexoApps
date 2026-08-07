/**
 * Template Service — NexoApps Phase 9B
 * Frontend API service for AI application templates.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const templateService = {
  async listTemplates() {
    const res = await fetch(`${API_BASE}/app-builder/templates`);
    return res.json();
  },

  async getTemplateById(id: string) {
    const res = await fetch(`${API_BASE}/app-builder/templates/${id}`);
    return res.json();
  },

  async createTemplate(data: any) {
    const res = await fetch(`${API_BASE}/app-builder/templates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

// Backward compatibility helper for Phase 4/5 AI Builder
export const getAITemplates = async () => {
  const res = await templateService.listTemplates();
  return res.success ? res.data : [];
};
