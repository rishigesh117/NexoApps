import { fetchApi } from './apiClient';
import { DataSource } from '../../shared/types';

export const dataPlatformService = {
  getDataSources: async (): Promise<DataSource[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: DataSource[] }>('/data-platform/core/sources');
      return res.data;
    } catch {
      return [
        { id: 'ds-101', name: 'Enterprise PostgreSQL Cluster', sourceType: 'postgres', connectionUrl: 'postgresql://db.nexoapps.internal:5432/analytics', status: 'connected', lastSyncedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
        { id: 'ds-102', name: 'Snowflake Enterprise Warehouse', sourceType: 'snowflake', connectionUrl: 'snowflake://nexo.snowflakecomputing.com', status: 'connected', lastSyncedAt: new Date().toISOString(), createdAt: new Date().toISOString() }
      ];
    }
  }
};
