import { fetchApi } from './apiClient';
import { StorageVolume, StorageBucket } from '../../shared/types';

export const storageService = {
  getVolumes: async (): Promise<StorageVolume[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: StorageVolume[] }>('/cloud-platform/storage/volumes');
      return res.data;
    } catch {
      return [
        { id: 'vol-101', tenantId: 'tnt-enterprise-01', vmId: 'vm-1001', name: 'model-weights-nvme', sizeGb: 2000, volumeType: 'nvme_ssd', status: 'attached', createdAt: new Date().toISOString() }
      ];
    }
  },

  getBuckets: async (): Promise<StorageBucket[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: StorageBucket[] }>('/cloud-platform/storage/buckets');
      return res.data;
    } catch {
      return [
        { id: 'bkt-1', tenantId: 'tnt-enterprise-01', regionId: 'reg-1', bucketName: 'nexo-ai-datasets-prod', accessLevel: 'private', storageClass: 'standard', createdAt: new Date().toISOString() }
      ];
    }
  }
};
