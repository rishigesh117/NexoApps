/**
 * Report Service — NexoApps Phase 7C
 * Frontend API client for Reports, Schedules, and Exports.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const reportService = {
  async listReports() {
    const res = await fetch(`${API_BASE}/reports`);
    return res.json();
  },
  async getReport(id: string) {
    const res = await fetch(`${API_BASE}/reports/${id}`);
    return res.json();
  },
  async createReport(data: any) {
    const res = await fetch(`${API_BASE}/reports`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
  },
  async deleteReport(id: string) {
    const res = await fetch(`${API_BASE}/reports/${id}`, { method: 'DELETE' });
    return res.json();
  },
  async listSchedules(reportId: string) {
    const res = await fetch(`${API_BASE}/reports/${reportId}/schedules`);
    return res.json();
  },
  async createSchedule(reportId: string, data: any) {
    const res = await fetch(`${API_BASE}/reports/${reportId}/schedules`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
  },
  async exportReport(reportId: string, format: string) {
    const res = await fetch(`${API_BASE}/reports/${reportId}/export?format=${format}`, { method: 'POST' });
    return res.json();
  },
};
