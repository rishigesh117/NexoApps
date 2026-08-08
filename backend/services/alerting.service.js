/**
 * Alerting Service — NexoApps Phase 12C (v9.3)
 * Create and evaluate alert rules and manage triggered alert events.
 * Conditions: threshold, anomaly, availability, error rate, latency, resource utilization
 * Severities: warning, critical, emergency
 */

class AlertingService {
  constructor() {
    this.rules = [
      {
        id: 'arule-1',
        projectId: 'oproj-1',
        name: 'High CPU Utilization (>85%)',
        severity: 'warning',
        isEnabled: true,
        cooldownMinutes: 15,
        conditions: [
          { id: 'acond-1', ruleId: 'arule-1', metricName: 'system.cpu.utilization', operator: '>', threshold: 85.0, evaluationWindowMinutes: 5 },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'arule-2',
        projectId: 'oproj-1',
        name: 'High HTTP Error Rate (>5%)',
        severity: 'critical',
        isEnabled: true,
        cooldownMinutes: 10,
        conditions: [
          { id: 'acond-2', ruleId: 'arule-2', metricName: 'http.error.rate', operator: '>', threshold: 5.0, evaluationWindowMinutes: 5 },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'arule-3',
        projectId: 'oproj-1',
        name: 'Service Unavailability Emergency',
        severity: 'emergency',
        isEnabled: true,
        cooldownMinutes: 5,
        conditions: [
          { id: 'acond-3', ruleId: 'arule-3', metricName: 'uptime.status', operator: '==', threshold: 0.0, evaluationWindowMinutes: 1 },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    this.events = [
      {
        id: 'aevt-1',
        ruleId: 'arule-2',
        title: 'High HTTP Error Rate Spike on AI Reasoning Engine',
        message: 'HTTP 5xx error rate exceeded 5.0% threshold (current: 5.8%) over 5m evaluation window.',
        severity: 'critical',
        status: 'triggered',
        triggeredAt: new Date(Date.now() - 1200000).toISOString(),
        resolvedAt: null,
      },
      {
        id: 'aevt-2',
        ruleId: 'arule-1',
        title: 'CPU Spike Warning on redis-master-01',
        message: 'CPU usage spiked to 88.2% briefly.',
        severity: 'warning',
        status: 'resolved',
        triggeredAt: new Date(Date.now() - 7200000).toISOString(),
        resolvedAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ];
  }

  async getAlertRules() {
    return this.rules;
  }

  async getAlertEvents() {
    return this.events;
  }

  async createAlertRule(data) {
    const newRule = {
      id: `arule-${Date.now()}`,
      projectId: data.projectId || 'oproj-1',
      name: data.name,
      severity: data.severity || 'warning',
      isEnabled: data.isEnabled !== false,
      cooldownMinutes: Number(data.cooldownMinutes) || 15,
      conditions: data.conditions || [
        { id: `acond-${Date.now()}`, ruleId: `arule-${Date.now()}`, metricName: data.metricName || 'system.cpu.utilization', operator: data.operator || '>', threshold: Number(data.threshold) || 80.0, evaluationWindowMinutes: 5 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.rules.push(newRule);
    return newRule;
  }

  async updateAlertRule(id, data) {
    const idx = this.rules.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    this.rules[idx] = { ...this.rules[idx], ...data, updatedAt: new Date().toISOString() };
    return this.rules[idx];
  }

  async acknowledgeAlert(eventId) {
    const event = this.events.find((e) => e.id === eventId);
    if (!event) return null;
    event.status = 'acknowledged';
    return event;
  }

  async resolveAlert(eventId) {
    const event = this.events.find((e) => e.id === eventId);
    if (!event) return null;
    event.status = 'resolved';
    event.resolvedAt = new Date().toISOString();
    return event;
  }
}

module.exports = new AlertingService();
