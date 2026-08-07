/**
 * Plugin Service — NexoApps Phase 9C
 * Frontend API service for plugin catalog, installations, permissions, and updates.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const pluginService = {
  async listPlugins() {
    const res = await fetch(`${API_BASE}/marketplace/plugins/registry`);
    return res.json();
  },

  async registerPlugin(data: any) {
    const res = await fetch(`${API_BASE}/marketplace/plugins/registry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async listInstallations() {
    const res = await fetch(`${API_BASE}/marketplace/plugins/installations`);
    return res.json();
  },

  async installPlugin(pluginId: string) {
    const res = await fetch(`${API_BASE}/marketplace/plugins/install`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pluginId }),
    });
    return res.json();
  },
};
