/**
 * Environment Service — NexoApps Phase 7D
 * Frontend API client for Environment Profiles, Variables, and Secrets Vault.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const environmentService = {
  async listProfiles() {
    const res = await fetch(`${API_BASE}/environments/profiles`);
    return res.json();
  },
  async createProfile(data: any) {
    const res = await fetch(`${API_BASE}/environments/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listVariables(profileId: string) {
    const res = await fetch(`${API_BASE}/environments/profiles/${profileId}/variables`);
    return res.json();
  },
  async addVariable(profileId: string, data: any) {
    const res = await fetch(`${API_BASE}/environments/profiles/${profileId}/variables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listSecrets() {
    const res = await fetch(`${API_BASE}/environments/secrets`);
    return res.json();
  },
  async createSecret(data: any) {
    const res = await fetch(`${API_BASE}/environments/secrets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async rotateSecret(id: string) {
    const res = await fetch(`${API_BASE}/environments/secrets/${id}/rotate`, { method: 'POST' });
    return res.json();
  },
};
