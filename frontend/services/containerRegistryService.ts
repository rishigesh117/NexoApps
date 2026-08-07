import { fetchApi } from './apiClient';
import { ContainerImage, ContainerRegistry } from '../../shared/types';

export const containerRegistryService = {
  getImages: async (): Promise<ContainerImage[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ContainerImage[] }>('/developer-cloud/artifacts/containers');
      return res.data;
    } catch {
      return [
        { id: 'img-101', registryId: 'cr-1', imageName: 'nexoapps/api-gateway', tag: 'v8.1.0-latest', sizeBytes: 184000000, pushedAt: new Date().toISOString() },
        { id: 'img-102', registryId: 'cr-1', imageName: 'nexoapps/ai-runtime-kernel', tag: 'v8.1.0-cuda12', sizeBytes: 2450000000, pushedAt: new Date().toISOString() }
      ];
    }
  }
};
