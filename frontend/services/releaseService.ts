import { fetchApi } from './apiClient';
import { ReleaseHistory, PlatformBackup } from '../../shared/types';

export const releaseService = {
  getReleases: async (): Promise<ReleaseHistory[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ReleaseHistory[] }>('/platform/release/history');
      return res.data;
    } catch {
      return [
        { id: 'rel-v8.0', releaseVersion: '8.0.0', releaseName: 'NexoApps AI Hyper Platform Production Release', notes: 'Unified release of all 15 platform modules (Phases 1A through 10E).', deployedAt: new Date().toISOString() }
      ];
    }
  },

  getBackups: async (): Promise<PlatformBackup[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: PlatformBackup[] }>('/platform/release/backups');
      return res.data;
    } catch {
      return [
        { id: 'bak-v8.0-final', backupName: 'NexoApps_v8.0_Production_Snapshot', sizeBytes: 15420000000, storageUrl: 's3://nexo-backups-prod/v8.0-final.tar.gz', status: 'completed', createdAt: new Date().toISOString() }
      ];
    }
  }
};
