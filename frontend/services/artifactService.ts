import { fetchApi } from './apiClient';
import { Artifact, ArtifactRegistry } from '../../shared/types';

export const artifactService = {
  getArtifacts: async (): Promise<Artifact[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: Artifact[] }>('/developer-cloud/artifacts/artifacts');
      return res.data;
    } catch {
      return [
        { id: 'art-101', runId: 'run-901', artifactName: 'nexoapps-bundle-v8.1.0.tgz', fileSize: 48200000, downloadUrl: 'https://cdn.nexoapps.internal/artifacts/bundle-v8.1.0.tgz', createdAt: new Date().toISOString() }
      ];
    }
  }
};
