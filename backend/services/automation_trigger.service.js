/**
 * Automation Trigger Service — NexoApps Phase 11C
 * Handles Webhook, Schedule, Event Bus, and File Triggers.
 */

const { v4: uuidv4 } = require('uuid');

class AutomationTriggerService {
  async listTriggers(workflowId) {
    return [
      {
        id: 'trig-301',
        workflowId: workflowId || 'wf-1001',
        triggerName: 'Invoice Processing Webhook Trigger',
        triggerType: 'webhook',
        eventPattern: 'crm.invoice.received',
        config: { endpoint: '/api/v1/automation/webhooks/invoice', auth: 'bearer' },
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'trig-302',
        workflowId: workflowId || 'wf-1002',
        triggerName: 'System Health Anomaly Event',
        triggerType: 'event_bus',
        eventPattern: 'telemetry.alert.high_cpu',
        config: { busName: 'platform_event_bus', queue: 'automation_high_priority' },
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async createTrigger(data) {
    return {
      id: `trig-${uuidv4().substring(0, 8)}`,
      workflowId: data.workflowId,
      triggerName: data.triggerName || 'New Automation Trigger',
      triggerType: data.triggerType || 'webhook',
      eventPattern: data.eventPattern || '',
      config: data.config || {},
      isActive: true,
      createdAt: new Date().toISOString(),
    };
  }

  async listSubscriptions(triggerId) {
    return [
      {
        id: 'sub-401',
        triggerId: triggerId || 'trig-301',
        eventType: 'invoice.created',
        targetUrl: 'https://api.nexoapps.internal/automation/workflows/wf-1001/execute',
        filterRules: { minAmount: 100 },
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

module.exports = new AutomationTriggerService();
