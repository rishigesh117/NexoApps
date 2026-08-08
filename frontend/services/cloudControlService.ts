import { CloudProvider, CloudAccount } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const cloudControlService = {
  async getOverview() {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/core/overview`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      return {
        version: '9.5.0',
        status: 'operational',
        controlPlaneHealthScore: 100.0,
        providersCount: 4,
        accountsCount: 2,
        regionsCount: 3,
        resourcesCount: 2,
        drPlansCount: 2,
      };
    }
  },

  async getProviders(): Promise<CloudProvider[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/core/providers`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'cprov-aws', providerName: 'Amazon Web Services (AWS)', providerType: 'public_cloud', status: 'active', createdAt: new Date().toISOString() },
        { id: 'cprov-gcp', providerName: 'Google Cloud Platform (GCP)', providerType: 'public_cloud', status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getAccounts(): Promise<CloudAccount[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/core/accounts`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'cacc-1', providerId: 'cprov-aws', accountName: 'NexoApps Prod AWS Master', accountIdNumber: '123456789012', environment: 'production', status: 'connected', createdAt: new Date().toISOString() },
      ];
    }
  },
};
