/**
 * Engineering Analytics Service — NexoApps Phase 9D
 * Frontend API service for code coverage, technical debt & SDLC velocity telemetry.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const engineeringAnalyticsService = {
  async getMetrics(projectId: string) {
    const res = await fetch(`${API_BASE}/software-engineering/studio/projects/${projectId}/metrics`);
    return res.json();
  },

  async getArchitecture(projectId: string) {
    const res = await fetch(`${API_BASE}/software-engineering/studio/projects/${projectId}/architecture`);
    return res.json();
  },

  async getDatabaseDesign(projectId: string) {
    const res = await fetch(`${API_BASE}/software-engineering/studio/projects/${projectId}/database`);
    return res.json();
  },

  async getApiSpec(projectId: string) {
    const res = await fetch(`${API_BASE}/software-engineering/studio/projects/${projectId}/api-spec`);
    return res.json();
  },

  async listBugs(projectId: string) {
    const res = await fetch(`${API_BASE}/software-engineering/studio/projects/${projectId}/bugs`);
    return res.json();
  },

  async getPipelines(projectId: string) {
    const res = await fetch(`${API_BASE}/software-engineering/studio/projects/${projectId}/pipelines`);
    return res.json();
  },
};
