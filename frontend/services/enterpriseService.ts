/**
 * Enterprise Service — NexoApps Phase 8D
 * Frontend API client for Digital Workforce, Departments, Executive Dashboards, and Metrics.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const enterpriseService = {
  async listDepartments() {
    const res = await fetch(`${API_BASE}/enterprise/departments`);
    return res.json();
  },
  async listEmployees(departmentId: string = 'all') {
    const res = await fetch(`${API_BASE}/enterprise/employees/${departmentId}`);
    return res.json();
  },
  async createEmployee(departmentId: string, data: any) {
    const res = await fetch(`${API_BASE}/enterprise/employees/${departmentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async getDashboard() {
    const res = await fetch(`${API_BASE}/enterprise/dashboard`);
    return res.json();
  },
  async getMetrics(departmentId: string = 'all') {
    const res = await fetch(`${API_BASE}/enterprise/metrics/${departmentId}`);
    return res.json();
  },
};
