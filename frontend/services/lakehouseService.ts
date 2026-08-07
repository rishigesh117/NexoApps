import { fetchApi } from './apiClient';
import { DataLakehouse, DataCatalog } from '../../shared/types';

export const lakehouseService = {
  getLakehouses: async (): Promise<DataLakehouse[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: DataLakehouse[] }>('/data-platform/core/lakehouse');
      return res.data;
    } catch {
      return [
        { id: 'lake-prod', name: 'Nexo Enterprise Data Lakehouse', storageLocation: 's3://nexo-data-lakehouse-prod/', format: 'iceberg', totalSizeGb: 4850.5, createdAt: new Date().toISOString() }
      ];
    }
  },

  getCatalog: async (): Promise<DataCatalog[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: DataCatalog[] }>('/data-platform/core/catalog');
      return res.data;
    } catch {
      return [
        { id: 'cat-item-1', lakehouseId: 'lake-prod', tableName: 'fact_user_activity', schemaDefinition: 'user_id VARCHAR, event_type VARCHAR', recordCount: 14200000, updatedAt: new Date().toISOString() }
      ];
    }
  }
};
