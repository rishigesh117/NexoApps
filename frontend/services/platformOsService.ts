/**
 * Platform OS Service — NexoApps Phase 9E
 * Frontend API service for platform telemetry, health monitoring & feature flags.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const platformOsService = {
  async getDashboardMetrics() {
    const res = await fetch(`${API_BASE}/ai-os/platform/dashboard`);
    return res.json();
  },

  async listModules() {
    const res = await fetch(`${API_BASE}/ai-os/platform/modules`);
    return res.json();
  },

  async getModuleHealth() {
    const res = await fetch(`${API_BASE}/ai-os/platform/health`);
    return res.json();
  },

  async listFeatureFlags() {
    const res = await fetch(`${API_BASE}/ai-os/platform/feature-flags`);
    return res.json();
  },

  async getVersionHistory() {
    const res = await fetch(`${API_BASE}/ai-os/platform/version-history`);
    return res.json();
  },
};
