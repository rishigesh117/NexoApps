import { LogSource, LogStream, LogEntry } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const loggingService = {
  async getSources(): Promise<LogSource[]> {
    try {
      const res = await fetch(`${API_BASE}/observability/logs/sources`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'lsrc-1', sourceName: 'application-core', sourceType: 'application', status: 'active', createdAt: new Date().toISOString() },
        { id: 'lsrc-2', sourceName: 'kubernetes-cluster-prod', sourceType: 'kubernetes', status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getStreams(sourceId?: string): Promise<LogStream[]> {
    try {
      const query = sourceId ? `?sourceId=${sourceId}` : '';
      const res = await fetch(`${API_BASE}/observability/logs/streams${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'lstr-1', sourceId: 'lsrc-1', streamName: 'api-gateway-stdout', retentionDays: 30, createdAt: new Date().toISOString() },
        { id: 'lstr-2', sourceId: 'lsrc-1', streamName: 'ai-reasoning-stderr', retentionDays: 30, createdAt: new Date().toISOString() },
      ];
    }
  },

  async searchLogs(params: { query?: string; severity?: string; serviceId?: string; streamId?: string; limit?: number }) {
    try {
      const res = await fetch(`${API_BASE}/observability/logs/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      return json.data || { total: 0, logs: [] };
    } catch (err) {
      return {
        total: 3,
        logs: [
          { id: 'log-1', streamId: 'lstr-1', serviceId: 'osvc-1', severity: 'INFO', message: 'HTTP GET /api/v1/observability/dashboards completed in 14ms', timestamp: new Date().toISOString() },
          { id: 'log-2', streamId: 'lstr-2', serviceId: 'osvc-3', severity: 'WARN', message: 'High model inference latency detected on ONNX worker #3', timestamp: new Date().toISOString() },
          { id: 'log-3', streamId: 'lstr-2', serviceId: 'osvc-3', severity: 'ERROR', message: 'Failed to allocate GPU memory buffer for transformer context batch', timestamp: new Date().toISOString() },
        ] as LogEntry[],
      };
    }
  },
};
