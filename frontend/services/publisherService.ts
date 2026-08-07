/**
 * Publisher Service — NexoApps Phase 9C
 * Frontend API service for publisher dashboards, verification, and items.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const publisherService = {
  async getDashboard() {
    const res = await fetch(`${API_BASE}/marketplace/publishers/dashboard`);
    return res.json();
  },

  async listPublishers() {
    const res = await fetch(`${API_BASE}/marketplace/publishers/list`);
    return res.json();
  },

  async verifyPublisher(id: string) {
    const res = await fetch(`${API_BASE}/marketplace/publishers/verify/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  },
};
