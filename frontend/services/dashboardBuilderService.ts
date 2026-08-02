/**
 * Dashboard Builder Service — NexoApps Phase 7C
 * Frontend API client for Custom Dashboards and Widgets.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const dashboardBuilderService = {
  async listDashboards() {
    const res = await fetch(`${API_BASE}/dashboard-builder`);
    return res.json();
  },
  async getDashboard(id: string) {
    const res = await fetch(`${API_BASE}/dashboard-builder/${id}`);
    return res.json();
  },
  async createDashboard(data: any) {
    const res = await fetch(`${API_BASE}/dashboard-builder`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
  },
  async listWidgets(dashboardId: string) {
    const res = await fetch(`${API_BASE}/dashboard-builder/${dashboardId}/widgets`);
    return res.json();
  },
  async addWidget(dashboardId: string, data: any) {
    const res = await fetch(`${API_BASE}/dashboard-builder/${dashboardId}/widgets`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
  },
  async listExecutiveDashboards() {
    const res = await fetch(`${API_BASE}/dashboard-builder/executive`);
    return res.json();
  },
  async getExecutiveSummary() {
    const res = await fetch(`${API_BASE}/dashboard-builder/executive/summary`);
    return res.json();
  },
};
