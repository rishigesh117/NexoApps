/**
 * Logging Service — NexoApps Phase 12C (v9.3)
 * Centralized log ingestion, searching, filtering, severity classification, and retention-aware management.
 * Support: INFO, DEBUG, WARN, ERROR, FATAL
 */

class LoggingService {
  constructor() {
    this.sources = [
      { id: 'lsrc-1', sourceName: 'application-core', sourceType: 'application', status: 'active', createdAt: new Date().toISOString() },
      { id: 'lsrc-2', sourceName: 'kubernetes-cluster-prod', sourceType: 'kubernetes', status: 'active', createdAt: new Date().toISOString() },
      { id: 'lsrc-3', sourceName: 'database-audit-logs', sourceType: 'system', status: 'active', createdAt: new Date().toISOString() },
    ];

    this.streams = [
      { id: 'lstr-1', sourceId: 'lsrc-1', streamName: 'api-gateway-stdout', retentionDays: 30, createdAt: new Date().toISOString() },
      { id: 'lstr-2', sourceId: 'lsrc-1', streamName: 'ai-reasoning-stderr', retentionDays: 30, createdAt: new Date().toISOString() },
      { id: 'lstr-3', sourceId: 'lsrc-3', streamName: 'pg-audit-stream', retentionDays: 90, createdAt: new Date().toISOString() },
    ];

    this.entries = [
      {
        id: 'log-1',
        streamId: 'lstr-1',
        serviceId: 'osvc-1',
        severity: 'INFO',
        message: 'HTTP GET /api/v1/observability/dashboards completed in 14ms (200 OK)',
        structuredData: { httpMethod: 'GET', statusCode: 200, durationMs: 14, ip: '10.0.1.10' },
        timestamp: new Date(Date.now() - 60000).toISOString(),
      },
      {
        id: 'log-2',
        streamId: 'lstr-2',
        serviceId: 'osvc-3',
        severity: 'WARN',
        message: 'High model inference latency detected on ONNX runtime worker #3 (340ms)',
        structuredData: { workerId: 'worker-3', model: 'llama-3-8b-instruct', latencyMs: 340 },
        timestamp: new Date(Date.now() - 45000).toISOString(),
      },
      {
        id: 'log-3',
        streamId: 'lstr-2',
        serviceId: 'osvc-3',
        severity: 'ERROR',
        message: 'Failed to allocate GPU memory buffer for transformer context batch (CUDA OOM warning)',
        structuredData: { device: 'cuda:0', memoryRequiredMb: 2048, memoryAvailableMb: 512 },
        timestamp: new Date(Date.now() - 30000).toISOString(),
      },
      {
        id: 'log-4',
        streamId: 'lstr-1',
        serviceId: 'osvc-2',
        severity: 'INFO',
        message: 'JWT Token refresh successful for user user_enterprise_01',
        structuredData: { userId: 'user_enterprise_01', action: 'token_refresh' },
        timestamp: new Date(Date.now() - 15000).toISOString(),
      },
      {
        id: 'log-5',
        streamId: 'lstr-3',
        serviceId: 'osvc-4',
        severity: 'DEBUG',
        message: 'PostgreSQL autovacuum process completed on table metric_samples (scanned 145,000 pages)',
        structuredData: { table: 'metric_samples', pagesScanned: 145000 },
        timestamp: new Date().toISOString(),
      },
    ];
  }

  async getSources() {
    return this.sources;
  }

  async getStreams(sourceId) {
    if (sourceId) {
      return this.streams.filter((s) => s.sourceId === sourceId);
    }
    return this.streams;
  }

  async searchLogs(params = {}) {
    const { query, severity, serviceId, streamId, limit = 50 } = params;
    let results = [...this.entries];

    if (severity) {
      results = results.filter((l) => l.severity.toUpperCase() === severity.toUpperCase());
    }

    if (serviceId) {
      results = results.filter((l) => l.serviceId === serviceId);
    }

    if (streamId) {
      results = results.filter((l) => l.streamId === streamId);
    }

    if (query) {
      const q = query.toLowerCase();
      results = results.filter((l) => l.message.toLowerCase().includes(q));
    }

    // Sort descending by timestamp
    results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return {
      total: results.length,
      logs: results.slice(0, Number(limit)),
    };
  }

  async ingestLog(entryData) {
    const sanitizedMessage = this.sanitizeSecrets(entryData.message || '');
    const newEntry = {
      id: `log-${Date.now()}`,
      streamId: entryData.streamId || 'lstr-1',
      serviceId: entryData.serviceId || 'osvc-1',
      severity: (entryData.severity || 'INFO').toUpperCase(),
      message: sanitizedMessage,
      structuredData: entryData.structuredData || {},
      timestamp: new Date().toISOString(),
    };
    this.entries.push(newEntry);
    return newEntry;
  }

  sanitizeSecrets(text) {
    // Redact Bearer tokens, API keys, passwords
    return text
      .replace(/Bearer\s+[A-Za-z0-9\-\._~\+\/]+=*/gi, 'Bearer [REDACTED]')
      .replace(/password\s*=\s*['"]?[^'"\s]+['"]?/gi, 'password=[REDACTED]')
      .replace(/api[_-]?key\s*=\s*['"]?[^'"\s]+['"]?/gi, 'api_key=[REDACTED]');
  }
}

module.exports = new LoggingService();
