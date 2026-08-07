import { fetchApi } from './apiClient';
import { PipelineDefinition, PipelineRun } from '../../shared/types';

export const pipelineService = {
  getPipelines: async (): Promise<PipelineDefinition[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: PipelineDefinition[] }>('/developer-cloud/pipelines/definitions');
      return res.data;
    } catch {
      return [
        { id: 'pip-101', repoId: 'repo-101', pipelineName: 'Production Build & Containerize Pipeline', configYaml: 'version: 2.1\njobs:\n  build:\n    docker:\n      - image: node:18', isActive: true, createdAt: new Date().toISOString() }
      ];
    }
  },

  getRuns: async (pipelineId?: string): Promise<PipelineRun[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: PipelineRun[] }>('/developer-cloud/pipelines/runs');
      return res.data;
    } catch {
      return [
        { id: 'run-901', pipelineId: pipelineId || 'pip-101', runNumber: 104, status: 'success', startedAt: new Date(Date.now() - 300000).toISOString(), finishedAt: new Date().toISOString() }
      ];
    }
  }
};
