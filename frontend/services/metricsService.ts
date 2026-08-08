import { MetricDefinition, MetricSample } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const metricsService = {
  async getMetricDefinitions(): Promise<MetricDefinition[]> {
    try {
      const res = await fetch(`${API_BASE}/observability/metrics`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'mdef-1', metricName: 'system.cpu.utilization', metricType: 'gauge', unit: '%', description: 'Host CPU utilization percentage', createdAt: new Date().toISOString() },
        { id: 'mdef-2', metricName: 'system.memory.utilization', metricType: 'gauge', unit: '%', description: 'RAM utilization percentage', createdAt: new Date().toISOString() },
        { id: 'mdef-3', metricName: 'http.request.rate', metricType: 'counter', unit: 'req/sec', description: 'HTTP request rate', createdAt: new Date().toISOString() },
        { id: 'mdef-4', metricName: 'http.error.rate', metricType: 'gauge', unit: '%', description: 'HTTP 5xx error rate', createdAt: new Date().toISOString() },
        { id: 'mdef-5', metricName: 'http.latency.p95', metricType: 'histogram', unit: 'ms', description: '95th percentile response latency', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getSamples(metricId?: string, serviceId?: string): Promise<MetricSample[]> {
    try {
      const params = new URLSearchParams();
      if (metricId) params.append('metricId', metricId);
      if (serviceId) params.append('serviceId', serviceId);
      const res = await fetch(`${API_BASE}/observability/metrics/samples?${params.toString()}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'msamp-1', metricId: 'mdef-1', serviceId: 'osvc-1', value: 24.5, tags: { env: 'production' }, timestamp: new Date().toISOString() },
        { id: 'msamp-2', metricId: 'mdef-2', serviceId: 'osvc-1', value: 48.2, tags: { env: 'production' }, timestamp: new Date().toISOString() },
        { id: 'msamp-3', metricId: 'mdef-3', serviceId: 'osvc-1', value: 1420.0, tags: { env: 'production' }, timestamp: new Date().toISOString() },
      ];
    }
  },

  async queryMetrics(query: { metricName: string; serviceId?: string; timeRange?: string }) {
    try {
      const res = await fetch(`${API_BASE}/observability/metrics/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
      });
      const json = await res.json();
      return json.data;
    } catch (err) {
      return {
        metricName: query.metricName,
        unit: '%',
        samples: [],
        summary: { avg: 45.2, min: 12.0, max: 88.5, count: 24 },
        timeRange: query.timeRange || '1h',
      };
    }
  },
};
