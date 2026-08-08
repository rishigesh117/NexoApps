import { TraceService, TraceSpan, TraceEvent } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface TraceGroup {
  traceId: string;
  rootOperation: string;
  rootService: string;
  totalDurationMs: number;
  statusCode: 'OK' | 'ERROR' | 'UNSET';
  spansCount: number;
  timestamp: string;
  spans: TraceSpan[];
}

export const tracingService = {
  async getServices(): Promise<TraceService[]> {
    try {
      const res = await fetch(`${API_BASE}/observability/traces/services`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'tsvc-1', serviceName: 'api-gateway', environment: 'production', createdAt: new Date().toISOString() },
        { id: 'tsvc-2', serviceName: 'auth-service', environment: 'production', createdAt: new Date().toISOString() },
        { id: 'tsvc-3', serviceName: 'ai-reasoning-engine', environment: 'production', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getTraces(limit = 20): Promise<TraceGroup[]> {
    try {
      const res = await fetch(`${API_BASE}/observability/traces?limit=${limit}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        {
          traceId: 'tr-98014a7c',
          rootOperation: 'POST /api/v1/ai/reasoning/evaluate',
          rootService: 'api-gateway',
          totalDurationMs: 142.5,
          statusCode: 'OK',
          spansCount: 3,
          timestamp: new Date().toISOString(),
          spans: [
            { id: 'tspan-1', traceId: 'tr-98014a7c', spanId: 'span-001', serviceName: 'api-gateway', operationName: 'POST /api/v1/ai/reasoning/evaluate', durationMs: 142.5, statusCode: 'OK', timestamp: new Date().toISOString() },
            { id: 'tspan-2', traceId: 'tr-98014a7c', spanId: 'span-002', parentSpanId: 'span-001', serviceName: 'auth-service', operationName: 'ValidateBearerToken', durationMs: 12.1, statusCode: 'OK', timestamp: new Date().toISOString() },
            { id: 'tspan-3', traceId: 'tr-98014a7c', spanId: 'span-003', parentSpanId: 'span-001', serviceName: 'ai-reasoning-engine', operationName: 'RunInferencePipeline', durationMs: 118.4, statusCode: 'OK', timestamp: new Date().toISOString() },
          ],
        },
      ];
    }
  },

  async getTraceById(traceId: string): Promise<{ traceId: string; spans: TraceSpan[]; events: TraceEvent[] } | null> {
    try {
      const res = await fetch(`${API_BASE}/observability/traces/${traceId}`);
      const json = await res.json();
      return json.data || null;
    } catch (err) {
      return null;
    }
  },
};
