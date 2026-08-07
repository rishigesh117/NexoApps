import { fetchApi } from './apiClient';
import { TrainingJob } from '../../shared/types';

export const trainingService = {
  getJobs: async (): Promise<TrainingJob[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: TrainingJob[] }>('/modelops/training/jobs');
      return res.data;
    } catch {
      return [
        { id: 'job-101', jobName: 'Nexo-LLM 70B LoRA Fine-Tuning Job', framework: 'pytorch-distributed', datasetVersionId: 'dsv-v2.1', status: 'running', createdAt: new Date().toISOString() }
      ];
    }
  }
};
