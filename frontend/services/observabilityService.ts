/**
 * Observability Service — NexoApps Phase 8E
 * Frontend API client for System Telemetry, Health Snapshots, and Traces.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const observabilityService = {
  async getTelemetry() {
    const res = await fetch(`${API_BASE}/observability/telemetry`);
    return res.json();
  },
  async getHealthSnapshot() {
    const res = await fetch(`${API_BASE}/observability/health`);
    return res.json();
  },
};
