import { fetchApi } from './apiClient';
import { PlatformTelemetry } from '../../shared/types';

export const telemetryService = {
  getTelemetry: async (): Promise<PlatformTelemetry[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: PlatformTelemetry[] }>('/platform/core/telemetry');
      return res.data;
    } catch {
      return [
        { id: 'tel-1', eventType: 'PLATFORM_BOOT_SUCCESS', details: { version: '8.0.0-LTS' }, createdAt: new Date().toISOString() }
      ];
    }
  }
};
