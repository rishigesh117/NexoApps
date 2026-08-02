/**
 * BI Analytics Service — NexoApps Phase 7C
 * Frontend API client for Business Intelligence, KPIs, and Analytics Models.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const biAnalyticsService = {
  async getDashboardOverview() {
    const res = await fetch(`${API_BASE}/analytics-v2/overview`);
    return res.json();
  },
  async listAnalyticsModels() {
    const res = await fetch(`${API_BASE}/analytics-v2/models`);
    return res.json();
  },
  async getModel(id: string) {
    const res = await fetch(`${API_BASE}/analytics-v2/models/${id}`);
    return res.json();
  },
  async createModel(data: any) {
    const res = await fetch(`${API_BASE}/analytics-v2/models`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
  },
  async trainModel(id: string) {
    const res = await fetch(`${API_BASE}/analytics-v2/models/${id}/train`, { method: 'POST' });
    return res.json();
  },
  async listKPIs() {
    const res = await fetch(`${API_BASE}/analytics-v2/kpis`);
    return res.json();
  },
  async getRevenueInsights() {
    const res = await fetch(`${API_BASE}/analytics-v2/revenue-insights`);
    return res.json();
  },
  async getUserInsights() {
    const res = await fetch(`${API_BASE}/analytics-v2/user-insights`);
    return res.json();
  },
  async getPlatformInsights() {
    const res = await fetch(`${API_BASE}/analytics-v2/platform-insights`);
    return res.json();
  },
};
