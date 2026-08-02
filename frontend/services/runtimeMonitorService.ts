/**
 * Runtime Monitor Service — NexoApps Phase 8B
 * Frontend API client for Runtime Metrics, Logs, and Isolation Verification.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const runtimeMonitorService = {
  async getMetrics(instanceId: string = 'all') {
    const res = await fetch(`${API_BASE}/runtime-monitor/metrics/${instanceId}`);
    return res.json();
  },
  async getLogs(instanceId: string = 'all') {
    const res = await fetch(`${API_BASE}/runtime-monitor/logs/${instanceId}`);
    return res.json();
  },
  async verifyIsolationStatus(environmentId: string) {
    const res = await fetch(`${API_BASE}/runtime-monitor/isolation/${environmentId}`);
    return res.json();
  },
};
