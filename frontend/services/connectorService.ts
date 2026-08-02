/**
 * Connector Service — NexoApps Phase 8C
 * Frontend API client for Multi-Source Knowledge Connectors (Confluence, Notion, GitHub).
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const connectorService = {
  async listConnectors() {
    const res = await fetch(`${API_BASE}/connectors`);
    return res.json();
  },
  async triggerSync(connectorId: string) {
    const res = await fetch(`${API_BASE}/connectors/${connectorId}/sync`, { method: 'POST' });
    return res.json();
  },
};
