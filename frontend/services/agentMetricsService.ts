/**
 * Agent Metrics Service — NexoApps Phase 8A
 * Frontend API client for Agent Metrics, Token Telemetry, and Efficiency Scoring.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const agentMetricsService = {
  async getMetrics(agentId: string = 'all') {
    const res = await fetch(`${API_BASE}/agent-metrics/${agentId}`);
    return res.json();
  },
  async getWorkspaceTelemetry(workspaceId: string) {
    const res = await fetch(`${API_BASE}/agent-metrics/telemetry/${workspaceId}`);
    return res.json();
  },
};
