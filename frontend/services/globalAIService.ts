/**
 * Global AI Service — NexoApps Phase 8E
 * Frontend API client for Global AI Clusters & Distributed Networks.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const globalAIService = {
  async listClusters() {
    const res = await fetch(`${API_BASE}/global-ai/clusters`);
    return res.json();
  },
};
