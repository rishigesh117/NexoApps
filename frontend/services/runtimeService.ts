import { fetchApi } from './apiClient';
import { RuntimeLog } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function getRuntimeTelemetry(): Promise<RuntimeLog> {
  const res = await fetchApi<{ success: boolean; data: RuntimeLog }>('/runtime');
  return res.data;
}

// ─── Phase 8B Extensions ───

export const runtimeService = {
  async listEnvironments() {
    const res = await fetch(`${API_BASE}/runtime/environments`);
    return res.json();
  },
  async getEnvironment(id: string) {
    const res = await fetch(`${API_BASE}/runtime/environments/${id}`);
    return res.json();
  },
  async createEnvironment(data: any) {
    const res = await fetch(`${API_BASE}/runtime/environments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listInstances(environmentId: string) {
    const res = await fetch(`${API_BASE}/runtime/environments/${environmentId}/instances`);
    return res.json();
  },
  async invokeFunction(environmentId: string, payload: any = {}) {
    const res = await fetch(`${API_BASE}/runtime/environments/${environmentId}/invoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  async listContainers(instanceId: string) {
    const res = await fetch(`${API_BASE}/runtime/instances/${instanceId}/containers`);
    return res.json();
  },
  async listImages() {
    const res = await fetch(`${API_BASE}/runtime/images`);
    return res.json();
  },
};
