/**
 * Deployment Service V2 — NexoApps Phase 7D
 * Frontend API client for Deployment Pipelines, Clusters, and Targets.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const deploymentServiceV2 = {
  async listTargets() {
    const res = await fetch(`${API_BASE}/cloud/targets`);
    return res.json();
  },
  async createTarget(data: any) {
    const res = await fetch(`${API_BASE}/cloud/targets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listJobs(targetId: string) {
    const res = await fetch(`${API_BASE}/cloud/targets/${targetId}/jobs`);
    return res.json();
  },
  async createJob(data: any) {
    const res = await fetch(`${API_BASE}/cloud/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async getLogs(jobId: string) {
    const res = await fetch(`${API_BASE}/cloud/jobs/${jobId}/logs`);
    return res.json();
  },
  async listClusters() {
    const res = await fetch(`${API_BASE}/cloud/clusters`);
    return res.json();
  },
  async createCluster(data: any) {
    const res = await fetch(`${API_BASE}/cloud/clusters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listClusterNodes(clusterId: string) {
    const res = await fetch(`${API_BASE}/cloud/clusters/${clusterId}/nodes`);
    return res.json();
  },
};
