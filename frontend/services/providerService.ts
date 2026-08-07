/**
 * Provider Service — NexoApps Phase 9A
 * Frontend API service for AI provider management & model discovery.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const providerService = {
  async listProviders() {
    const res = await fetch(`${API_BASE}/ai-gateway/providers`);
    return res.json();
  },

  async getProviderById(id: string) {
    const res = await fetch(`${API_BASE}/ai-gateway/providers/${id}`);
    return res.json();
  },

  async createProvider(data: any) {
    const res = await fetch(`${API_BASE}/ai-gateway/providers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async listModels(providerId?: string) {
    const query = providerId ? `?providerId=${providerId}` : '';
    const res = await fetch(`${API_BASE}/ai-gateway/providers/models${query}`);
    return res.json();
  },

  async listCredentials() {
    const res = await fetch(`${API_BASE}/ai-gateway/providers/credentials`);
    return res.json();
  },

  async addCredential(data: any) {
    const res = await fetch(`${API_BASE}/ai-gateway/providers/credentials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
