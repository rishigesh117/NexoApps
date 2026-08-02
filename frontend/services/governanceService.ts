/**
 * Governance Service — NexoApps Phase 8E
 * Frontend API client for Enterprise AI Governance Policies & Compliance Logs.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const governanceService = {
  async listPolicies() {
    const res = await fetch(`${API_BASE}/governance/policies`);
    return res.json();
  },
  async getComplianceLogs() {
    const res = await fetch(`${API_BASE}/governance/compliance-logs`);
    return res.json();
  },
};
