/**
 * Metrics Service — NexoApps Phase 12C (v9.3)
 * Collect, aggregate, query, and analyze application and infrastructure metrics.
 */

class MetricsService {
  constructor() {
    this.metricDefinitions = [
      { id: 'mdef-1', metricName: 'system.cpu.utilization', metricType: 'gauge', unit: '%', description: 'Host/Container CPU utilization percentage', createdAt: new Date().toISOString() },
      { id: 'mdef-2', metricName: 'system.memory.utilization', metricType: 'gauge', unit: '%', description: 'Host/Container RAM utilization percentage', createdAt: new Date().toISOString() },
      { id: 'mdef-3', metricName: 'http.request.rate', metricType: 'counter', unit: 'req/sec', description: 'HTTP requests per second across endpoints', createdAt: new Date().toISOString() },
      { id: 'mdef-4', metricName: 'http.error.rate', metricType: 'gauge', unit: '%', description: 'HTTP 5xx error rate percentage', createdAt: new Date().toISOString() },
      { id: 'mdef-5', metricName: 'http.latency.p95', metricType: 'histogram', unit: 'ms', description: '95th percentile HTTP response latency', createdAt: new Date().toISOString() },
      { id: 'mdef-6', metricName: 'system.throughput', metricType: 'counter', unit: 'bytes/sec', description: 'Network I/O throughput in bytes per second', createdAt: new Date().toISOString() },
      { id: 'mdef-7', metricName: 'db.query.latency', metricType: 'histogram', unit: 'ms', description: 'Database query mean execution latency', createdAt: new Date().toISOString() },
      { id: 'mdef-8', metricName: 'queue.message.depth', metricType: 'gauge', unit: 'messages', description: 'Queue pending message depth', createdAt: new Date().toISOString() },
      { id: 'mdef-9', metricName: 'storage.capacity.used', metricType: 'gauge', unit: '%', description: 'Disk storage capacity utilization', createdAt: new Date().toISOString() },
    ];

    this.samples = [
      { id: 'msamp-1', metricId: 'mdef-1', serviceId: 'osvc-1', value: 24.5, tags: { env: 'production', host: 'api-01' }, timestamp: new Date().toISOString() },
      { id: 'msamp-2', metricId: 'mdef-2', serviceId: 'osvc-1', value: 48.2, tags: { env: 'production', host: 'api-01' }, timestamp: new Date().toISOString() },
      { id: 'msamp-3', metricId: 'mdef-3', serviceId: 'osvc-1', value: 1420.0, tags: { env: 'production', path: '/api/v1' }, timestamp: new Date().toISOString() },
      { id: 'msamp-4', metricId: 'mdef-4', serviceId: 'osvc-3', value: 3.8, tags: { env: 'production', service: 'ai-reasoning' }, timestamp: new Date().toISOString() },
      { id: 'msamp-5', metricId: 'mdef-5', serviceId: 'osvc-1', value: 45.8, tags: { env: 'production' }, timestamp: new Date().toISOString() },
      { id: 'msamp-6', metricId: 'mdef-7', serviceId: 'osvc-4', value: 8.2, tags: { db: 'postgresql-primary' }, timestamp: new Date().toISOString() },
      { id: 'msamp-7', metricId: 'mdef-8', serviceId: 'osvc-1', value: 12.0, tags: { queue: 'notifications' }, timestamp: new Date().toISOString() },
      { id: 'msamp-8', metricId: 'mdef-9', serviceId: 'osvc-1', value: 38.5, tags: { mount: '/var/data' }, timestamp: new Date().toISOString() },
    ];
  }

  async getMetricDefinitions() {
    return this.metricDefinitions;
  }

  async getMetricSamples(filter = {}) {
    let results = this.samples;
    if (filter.metricId) {
      results = results.filter((s) => s.metricId === filter.metricId);
    }
    if (filter.serviceId) {
      results = results.filter((s) => s.serviceId === filter.serviceId);
    }
    return results;
  }

  async queryMetrics(query) {
    const { metricName, serviceId, timeRange } = query || {};
    const def = this.metricDefinitions.find((m) => m.metricName === metricName);
    const metricId = def ? def.id : null;
    let samples = this.samples;

    if (metricId) {
      samples = samples.filter((s) => s.metricId === metricId);
    }
    if (serviceId) {
      samples = samples.filter((s) => s.serviceId === serviceId);
    }

    const values = samples.map((s) => s.value);
    const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    const min = values.length ? Math.min(...values) : 0;
    const max = values.length ? Math.max(...values) : 0;

    return {
      metricName: metricName || 'system.cpu.utilization',
      unit: def ? def.unit : '%',
      samples,
      summary: { avg, min, max, count: samples.length },
      timeRange: timeRange || '1h',
    };
  }

  async recordSample(data) {
    const sample = {
      id: `msamp-${Date.now()}`,
      metricId: data.metricId,
      serviceId: data.serviceId || 'osvc-1',
      value: Number(data.value),
      tags: data.tags || {},
      timestamp: new Date().toISOString(),
    };
    this.samples.push(sample);
    return sample;
  }
}

module.exports = new MetricsService();
