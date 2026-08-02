/**
 * Business Process Service — NexoApps Phase 8D
 * Frontend API client for Business Process definitions and Process Triggers.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const businessProcessService = {
  async listProcesses() {
    const res = await fetch(`${API_BASE}/business-process`);
    return res.json();
  },
  async createProcess(data: any) {
    const res = await fetch(`${API_BASE}/business-process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async triggerProcess(id: string) {
    const res = await fetch(`${API_BASE}/business-process/trigger/${id}`, { method: 'POST' });
    return res.json();
  },
};
