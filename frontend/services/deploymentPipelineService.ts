/**
 * Deployment Pipeline Service — NexoApps Phase 9B
 * Frontend API service for application compilation, environments & deployments.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const deploymentPipelineService = {
  async triggerBuild(applicationId: string) {
    const res = await fetch(`${API_BASE}/app-builder/pipeline/build/${applicationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  },

  async deployBuild(applicationId: string, buildId: string, environment = 'production') {
    const res = await fetch(`${API_BASE}/app-builder/pipeline/deploy/${applicationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buildId, environment }),
    });
    return res.json();
  },

  async listBuilds(applicationId: string) {
    const res = await fetch(`${API_BASE}/app-builder/pipeline/builds/${applicationId}`);
    return res.json();
  },

  async listDeployments(applicationId: string) {
    const res = await fetch(`${API_BASE}/app-builder/pipeline/deployments/${applicationId}`);
    return res.json();
  },

  async listEnvironments(applicationId: string) {
    const res = await fetch(`${API_BASE}/app-builder/pipeline/environments/${applicationId}`);
    return res.json();
  },

  async runTests(applicationId: string) {
    const res = await fetch(`${API_BASE}/app-builder/pipeline/test/${applicationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  },

  async listVersions(applicationId: string) {
    const res = await fetch(`${API_BASE}/app-builder/pipeline/versions/${applicationId}`);
    return res.json();
  },
};
