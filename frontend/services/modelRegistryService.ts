import { fetchApi } from './apiClient';
import { ModelRegistry } from '../../shared/types';

export const modelRegistryService = {
  getModels: async (): Promise<ModelRegistry[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ModelRegistry[] }>('/modelops/registry/models');
      return res.data;
    } catch {
      return [
        { id: 'mdl-101', modelName: 'Nexo-Llama-3.1-70B-Instruct-FineTuned', taskType: 'llm_generation', framework: 'transformers', isActive: true, createdAt: new Date().toISOString() },
        { id: 'mdl-102', modelName: 'Nexo-Embedding-v3-Large', taskType: 'text_embedding', framework: 'onnx', isActive: true, createdAt: new Date().toISOString() }
      ];
    }
  }
};
