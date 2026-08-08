/**
 * Tracing Service — NexoApps Phase 12C (v9.3)
 * Manage distributed tracing and trace spans across NexoApps microservices.
 * Track: trace ID, span ID, parent span, service, operation, duration, status, timestamp
 */

class TracingService {
  constructor() {
    this.services = [
      { id: 'tsvc-1', serviceName: 'api-gateway', environment: 'production', createdAt: new Date().toISOString() },
      { id: 'tsvc-2', serviceName: 'auth-service', environment: 'production', createdAt: new Date().toISOString() },
      { id: 'tsvc-3', serviceName: 'ai-reasoning-engine', environment: 'production', createdAt: new Date().toISOString() },
    ];

    this.spans = [
      {
        id: 'tspan-1',
        traceId: 'tr-98014a7c',
        spanId: 'span-001',
        parentSpanId: null,
        serviceName: 'api-gateway',
        operationName: 'POST /api/v1/ai/reasoning/evaluate',
        durationMs: 142.5,
        statusCode: 'OK',
        timestamp: new Date(Date.now() - 30000).toISOString(),
      },
      {
        id: 'tspan-2',
        traceId: 'tr-98014a7c',
        spanId: 'span-002',
        parentSpanId: 'span-001',
        serviceName: 'auth-service',
        operationName: 'ValidateBearerToken',
        durationMs: 12.1,
        statusCode: 'OK',
        timestamp: new Date(Date.now() - 29900).toISOString(),
      },
      {
        id: 'tspan-3',
        traceId: 'tr-98014a7c',
        spanId: 'span-003',
        parentSpanId: 'span-001',
        serviceName: 'ai-reasoning-engine',
        operationName: 'RunInferencePipeline',
        durationMs: 118.4,
        statusCode: 'OK',
        timestamp: new Date(Date.now() - 29800).toISOString(),
      },
      {
        id: 'tspan-4',
        traceId: 'tr-11029e8f',
        spanId: 'span-101',
        parentSpanId: null,
        serviceName: 'api-gateway',
        operationName: 'GET /api/v1/database-platform/clusters',
        durationMs: 28.2,
        statusCode: 'OK',
        timestamp: new Date(Date.now() - 15000).toISOString(),
      },
      {
        id: 'tspan-5',
        traceId: 'tr-55091b2c',
        spanId: 'span-201',
        parentSpanId: null,
        serviceName: 'api-gateway',
        operationName: 'POST /api/v1/modelops/deploy',
        durationMs: 450.0,
        statusCode: 'ERROR',
        timestamp: new Date(Date.now() - 5000).toISOString(),
      },
    ];

    this.events = [
      { id: 'tevt-1', spanId: 'span-201', eventName: 'DeployTimeoutException', attributes: { retryCount: 3, timeoutSec: 30 }, timestamp: new Date().toISOString() },
    ];
  }

  async getServices() {
    return this.services;
  }

  async getTraces(limit = 20) {
    // Group spans by traceId
    const tracesMap = {};
    for (const span of this.spans) {
      if (!tracesMap[span.traceId]) {
        tracesMap[span.traceId] = {
          traceId: span.traceId,
          rootOperation: span.operationName,
          rootService: span.serviceName,
          totalDurationMs: span.durationMs,
          statusCode: span.statusCode,
          spansCount: 0,
          timestamp: span.timestamp,
          spans: [],
        };
      }
      tracesMap[span.traceId].spans.push(span);
      tracesMap[span.traceId].spansCount += 1;
      if (span.statusCode === 'ERROR') {
        tracesMap[span.traceId].statusCode = 'ERROR';
      }
      if (span.durationMs > tracesMap[span.traceId].totalDurationMs) {
        tracesMap[span.traceId].totalDurationMs = span.durationMs;
      }
    }

    const list = Object.values(tracesMap).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return list.slice(0, Number(limit));
  }

  async getTraceById(traceId) {
    const spans = this.spans.filter((s) => s.traceId === traceId);
    if (!spans.length) return null;

    const spanIds = spans.map((s) => s.spanId);
    const events = this.events.filter((e) => spanIds.includes(e.spanId));

    return {
      traceId,
      spans,
      events,
    };
  }

  async ingestSpan(spanData) {
    const newSpan = {
      id: `tspan-${Date.now()}`,
      traceId: spanData.traceId || `tr-${Date.now().toString(16)}`,
      spanId: spanData.spanId || `span-${Date.now()}`,
      parentSpanId: spanData.parentSpanId || null,
      serviceName: spanData.serviceName || 'api-gateway',
      operationName: spanData.operationName || 'HTTP Request',
      durationMs: Number(spanData.durationMs) || 0,
      statusCode: spanData.statusCode || 'OK',
      timestamp: new Date().toISOString(),
    };
    this.spans.push(newSpan);
    return newSpan;
  }
}

module.exports = new TracingService();
