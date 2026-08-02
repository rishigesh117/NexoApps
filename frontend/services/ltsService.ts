/**
 * LTS Service — NexoApps Phase 7E
 * Frontend API client for Version 4.0 LTS Health, Security Audits, and Telemetry.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const ltsService = {
  async getHealthStatus() {
    const res = await fetch(`${API_BASE}/lts/health`);
    return res.json();
  },
  async getSecurityAudit() {
    const res = await fetch(`${API_BASE}/lts/security-audit`);
    return res.json();
  },
  async getPerformanceMetrics() {
    const res = await fetch(`${API_BASE}/lts/performance-metrics`);
    return res.json();
  },
  async listSecurityEvents() {
    const res = await fetch(`${API_BASE}/lts/security-events`);
    return res.json();
  },
};
