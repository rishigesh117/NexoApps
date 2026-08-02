/**
 * Memory Service — NexoApps Phase 8C
 * Frontend API client for RAG session memory graph and snapshots.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const memoryService = {
  async getMemory(sessionId: string) {
    const res = await fetch(`${API_BASE}/memory/${sessionId}`);
    return res.json();
  },
  async createSnapshot(sessionId: string, snapshotName?: string) {
    const res = await fetch(`${API_BASE}/memory/${sessionId}/snapshot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ snapshotName }),
    });
    return res.json();
  },
};
