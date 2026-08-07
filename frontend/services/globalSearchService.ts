/**
 * Global Search Service — NexoApps Phase 9E
 * Frontend API service for universal search across all AI OS modules.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const globalSearchService = {
  async search(query: string) {
    const res = await fetch(`${API_BASE}/ai-os/workspace/search?q=${encodeURIComponent(query)}`);
    return res.json();
  },
};
