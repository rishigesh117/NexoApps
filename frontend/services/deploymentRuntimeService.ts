/**
 * Deployment Runtime Service — NexoApps Phase 8B
 * Frontend API client for Serverless & Container Deployments and Autoscaling.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const deploymentRuntimeService = {
  async listDeployments(environmentId: string = 'default') {
    const res = await fetch(`${API_BASE}/runtime-deployment/deployments/${environmentId}`);
    return res.json();
  },
  async createDeployment(data: any) {
    const res = await fetch(`${API_BASE}/runtime-deployment/deployments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async getScalingPolicy(deploymentId: string) {
    const res = await fetch(`${API_BASE}/runtime-deployment/scaling/${deploymentId}`);
    return res.json();
  },
  async setScalingPolicy(deploymentId: string, data: any) {
    const res = await fetch(`${API_BASE}/runtime-deployment/scaling/${deploymentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
