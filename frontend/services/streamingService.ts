import { fetchApi } from './apiClient';
import { StreamingTopic } from '../../shared/types';

export const streamingService = {
  getTopics: async (): Promise<StreamingTopic[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: StreamingTopic[] }>('/data-platform/streaming/topics');
      return res.data;
    } catch {
      return [
        { id: 'top-1', topicName: 'nexo.telemetry.realtime', partitions: 8, replicationFactor: 3, status: 'active', createdAt: new Date().toISOString() },
        { id: 'top-2', topicName: 'nexo.ai.inference.events', partitions: 16, replicationFactor: 3, status: 'active', createdAt: new Date().toISOString() }
      ];
    }
  }
};
