/**
 * Release Service — NexoApps Phase 8E
 * Frontend API client for Version 5.4.0 Release Info and LTS History.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const releaseService = {
  async getReleaseInformation() {
    const res = await fetch(`${API_BASE}/releases/info`);
    return res.json();
  },
};
