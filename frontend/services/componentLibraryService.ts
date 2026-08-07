/**
 * Component Library Service — NexoApps Phase 9B
 * Frontend API service for reusable component blocks.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const componentLibraryService = {
  async listComponents() {
    const res = await fetch(`${API_BASE}/app-builder/components`);
    return res.json();
  },

  async listCategories() {
    const res = await fetch(`${API_BASE}/app-builder/components/categories`);
    return res.json();
  },

  async createComponent(data: any) {
    const res = await fetch(`${API_BASE}/app-builder/components`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
