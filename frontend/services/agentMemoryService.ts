/**
 * Agent Memory Service — NexoApps Phase 8A
 * Frontend API client for Persistent Agent Shared Memory and Knowledge Graph.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const agentMemoryService = {
  async getSharedMemory(workspaceId: string) {
    const res = await fetch(`${API_BASE}/agent-memory/${workspaceId}`);
    return res.json();
  },
  async setMemoryKey(workspaceId: string, data: any) {
    const res = await fetch(`${API_BASE}/agent-memory/${workspaceId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async deleteMemoryKey(id: string) {
    const res = await fetch(`${API_BASE}/agent-memory/${id}`, { method: 'DELETE' });
    return res.json();
  },
};
