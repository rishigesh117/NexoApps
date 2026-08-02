import { fetchApi } from './apiClient';
import { AIWorkflow } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function getAIWorkflows(): Promise<AIWorkflow[]> {
  const res = await fetchApi<{ success: boolean; data: AIWorkflow[] }>('/builder/workflows');
  return res.data || [];
}

export async function createAIWorkflow(name: string, triggerType: string, actions: string[]): Promise<AIWorkflow> {
  const res = await fetchApi<{ success: boolean; data: AIWorkflow }>('/builder/workflow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, triggerType, actions }),
  });
  return res.data;
}

// ─── Phase 7D Extensions ───

export const workflowService = {
  async listTemplates() {
    const res = await fetch(`${API_BASE}/workflows/templates`);
    return res.json();
  },
  async listInstances() {
    const res = await fetch(`${API_BASE}/workflows/instances`);
    return res.json();
  },
  async getInstance(id: string) {
    const res = await fetch(`${API_BASE}/workflows/instances/${id}`);
    return res.json();
  },
  async createInstance(data: any) {
    const res = await fetch(`${API_BASE}/workflows/instances`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async getSteps(id: string) {
    const res = await fetch(`${API_BASE}/workflows/instances/${id}/steps`);
    return res.json();
  },
  async runWorkflow(id: string, payload: any = {}) {
    const res = await fetch(`${API_BASE}/workflows/instances/${id}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  async listRuns(id: string) {
    const res = await fetch(`${API_BASE}/workflows/instances/${id}/runs`);
    return res.json();
  },
  async getLogs(runId: string) {
    const res = await fetch(`${API_BASE}/workflows/runs/${runId}/logs`);
    return res.json();
  },
};
