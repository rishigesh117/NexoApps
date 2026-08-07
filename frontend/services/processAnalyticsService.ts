/**
 * Process Analytics Service — NexoApps Phase 11C
 * Frontend API client for Process Analytics, Efficiency Scores, & Recommendations.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const processAnalyticsService = {
  async getDashboardSummary() {
    const res = await fetch(`${API_BASE}/automation/core/analytics/dashboard`);
    return res.json();
  },
};
