/**
 * Recommendation Service — NexoApps Phase 9C
 * Frontend API service for AI personalized recommendations & trending items.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const recommendationService = {
  async getRecommendations() {
    const res = await fetch(`${API_BASE}/marketplace/recommendations`);
    return res.json();
  },

  async getAnalytics() {
    const res = await fetch(`${API_BASE}/marketplace/admin/analytics`);
    return res.json();
  },
};
