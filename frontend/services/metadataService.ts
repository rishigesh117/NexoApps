import { fetchApi } from './apiClient';
import { DataLineage } from '../../shared/types';

export const metadataService = {
  getLineage: async (): Promise<DataLineage[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: DataLineage[] }>('/data-platform/governance/lineage');
      return res.data;
    } catch {
      return [
        { id: 'lin-1', sourceAssetId: 'asset-raw-logs', targetAssetId: 'asset-clean-events', transformationLogic: 'SELECT event_type, user_id FROM raw_logs', createdAt: new Date().toISOString() }
      ];
    }
  }
};
