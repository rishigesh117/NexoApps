import { fetchApi } from './apiClient';
import { GlobalConfiguration } from '../../shared/types';

export const configurationService = {
  getConfigs: async (): Promise<GlobalConfiguration[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: GlobalConfiguration[] }>('/platform/config/configs');
      return res.data;
    } catch {
      return [
        { id: 'cfg-1', configKey: 'SYSTEM_NAME', configValue: 'NexoApps AI Hyper Platform', category: 'general', updatedAt: new Date().toISOString() },
        { id: 'cfg-2', configKey: 'VERSION_LTS', configValue: '8.0.0', category: 'release', updatedAt: new Date().toISOString() }
      ];
    }
  }
};
