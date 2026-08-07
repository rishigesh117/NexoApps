import { fetchApi } from './apiClient';
import { IntegrationProvider, IntegrationLog } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function getIntegrationProviders(): Promise<{ providers: IntegrationProvider[]; logs: IntegrationLog[] }> {
  const res = await fetchApi<{ success: boolean; data: { providers: IntegrationProvider[]; logs: IntegrationLog[] } }>('/integrations/providers');
  return res.data || { providers: [], logs: [] };
}

export const integrationService = {
  async listIntegrations() {
    const res = await fetch(`${API_BASE}/automation/integrations/integrations`);
    return res.json();
  },
  async createIntegration(data: any) {
    const res = await fetch(`${API_BASE}/automation/integrations/integrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listConnections(integrationId: string) {
    const res = await fetch(`${API_BASE}/automation/integrations/integrations/${integrationId}/connections`);
    return res.json();
  },
  async testConnection(connectionId: string) {
    const res = await fetch(`${API_BASE}/automation/integrations/connections/${connectionId}/test`, {
      method: 'POST',
    });
    return res.json();
  },
};
