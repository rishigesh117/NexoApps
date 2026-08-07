/**
 * Extension Service — NexoApps Phase 9C
 * Frontend API service for platform extensions, SDK packages, and manifests.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const extensionService = {
  async listExtensions() {
    const res = await fetch(`${API_BASE}/marketplace/extensions/packages`);
    return res.json();
  },

  async registerExtension(data: any) {
    const res = await fetch(`${API_BASE}/marketplace/extensions/packages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
