/**
 * Prediction Service — NexoApps Phase 7C
 * Frontend API client for Predictive Analytics and Audit Reports.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const predictionService = {
  async listJobs() {
    const res = await fetch(`${API_BASE}/predictions/jobs`);
    return res.json();
  },
  async createJob(data: any) {
    const res = await fetch(`${API_BASE}/predictions/jobs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
  },
  async getJobResults(jobId: string) {
    const res = await fetch(`${API_BASE}/predictions/jobs/${jobId}/results`);
    return res.json();
  },
  async listAuditReports() {
    const res = await fetch(`${API_BASE}/predictions/audit-reports`);
    return res.json();
  },
  async generateAuditReport(data: any) {
    const res = await fetch(`${API_BASE}/predictions/audit-reports`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
  },
};
