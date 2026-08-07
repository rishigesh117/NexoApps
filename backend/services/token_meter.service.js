/**
 * Token Meter Service — NexoApps Phase 9A
 * Real-time token usage aggregation, request duration telemetry & cost accounting.
 */

const { v4: uuidv4 } = require('uuid');

class TokenMeterService {
  constructor() {
    this.usageLogs = [
      {
        id: 'log-1',
        userId: 'user-owner',
        providerId: 'prov-openai',
        modelKey: 'gpt-4o',
        promptTokens: 1250,
        completionTokens: 450,
        totalTokens: 1700,
        estimatedCost: 0.0076,
        requestDurationMs: 320,
        statusCode: 200,
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'log-2',
        userId: 'user-owner',
        providerId: 'prov-anthropic',
        modelKey: 'claude-3-5-sonnet-20241022',
        promptTokens: 3100,
        completionTokens: 820,
        totalTokens: 3920,
        estimatedCost: 0.0216,
        requestDurationMs: 410,
        statusCode: 200,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'log-3',
        userId: 'user-owner',
        providerId: 'prov-groq',
        modelKey: 'llama-3.3-70b-versatile',
        promptTokens: 4500,
        completionTokens: 1200,
        totalTokens: 5700,
        estimatedCost: 0.0036,
        requestDurationMs: 95,
        statusCode: 200,
        createdAt: new Date().toISOString()
      }
    ];

    this.aggregatedTokenUsage = [
      { id: 'tu-1', userId: 'user-owner', providerId: 'prov-openai', periodStart: '2026-08-01', periodEnd: '2026-08-31', totalTokens: 1285000, totalCost: 14.85, requestCount: 420, updatedAt: new Date().toISOString() },
      { id: 'tu-2', userId: 'user-owner', providerId: 'prov-anthropic', periodStart: '2026-08-01', periodEnd: '2026-08-31', totalTokens: 940000, periodEnd: '2026-08-31', totalCost: 18.20, requestCount: 280, updatedAt: new Date().toISOString() },
      { id: 'tu-3', userId: 'user-owner', providerId: 'prov-gemini', periodStart: '2026-08-01', periodEnd: '2026-08-31', totalTokens: 2100000, totalCost: 8.50, requestCount: 650, updatedAt: new Date().toISOString() },
      { id: 'tu-4', userId: 'user-owner', providerId: 'prov-groq', periodStart: '2026-08-01', periodEnd: '2026-08-31', totalTokens: 4500000, totalCost: 3.20, requestCount: 1200, updatedAt: new Date().toISOString() }
    ];
  }

  async recordUsage(logData) {
    const log = {
      id: `log-${uuidv4().substring(0, 8)}`,
      userId: logData.userId || 'user-owner',
      providerId: logData.providerId,
      modelKey: logData.modelKey,
      promptTokens: logData.promptTokens || 0,
      completionTokens: logData.completionTokens || 0,
      totalTokens: (logData.promptTokens || 0) + (logData.completionTokens || 0),
      estimatedCost: logData.estimatedCost || 0.001,
      requestDurationMs: logData.requestDurationMs || 150,
      statusCode: logData.statusCode || 200,
      createdAt: new Date().toISOString()
    };
    this.usageLogs.push(log);
    return log;
  }

  async getUsageLogs(filter = {}) {
    return this.usageLogs;
  }

  async getTokenAnalytics() {
    const totalTokens = this.aggregatedTokenUsage.reduce((acc, curr) => acc + curr.totalTokens, 0);
    const totalCost = this.aggregatedTokenUsage.reduce((acc, curr) => acc + curr.totalCost, 0);
    const totalRequests = this.aggregatedTokenUsage.reduce((acc, curr) => acc + curr.requestCount, 0);

    return {
      summary: {
        totalTokens,
        totalCost: parseFloat(totalCost.toFixed(2)),
        totalRequests,
        activeProvidersCount: this.aggregatedTokenUsage.length
      },
      providerBreakdown: this.aggregatedTokenUsage
    };
  }
}

module.exports = new TokenMeterService();
