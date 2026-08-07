/**
 * Automation Service — NexoApps Phase 11C
 * Frontend API client for Workspaces, Event Automation, Triggers, Business Rules, and Decision Tables.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const automationService = {
  // Phase 7D Legacy Methods
  async listJobs() {
    const res = await fetch(`${API_BASE}/automation/jobs`);
    return res.json();
  },
  async createJob(data: any) {
    const res = await fetch(`${API_BASE}/automation/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async toggleJob(id: string) {
    const res = await fetch(`${API_BASE}/automation/jobs/${id}/toggle`, { method: 'POST' });
    return res.json();
  },
  async listQueues() {
    const res = await fetch(`${API_BASE}/automation/queues`);
    return res.json();
  },
  async createQueue(data: any) {
    const res = await fetch(`${API_BASE}/automation/queues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listQueueMessages(queueId: string) {
    const res = await fetch(`${API_BASE}/automation/queues/${queueId}/messages`);
    return res.json();
  },
  async purgeQueue(queueId: string) {
    const res = await fetch(`${API_BASE}/automation/queues/${queueId}/purge`, { method: 'POST' });
    return res.json();
  },
  async listWorkers() {
    const res = await fetch(`${API_BASE}/automation/workers`);
    return res.json();
  },
  async listSchedules() {
    const res = await fetch(`${API_BASE}/automation/schedules`);
    return res.json();
  },

  // Phase 11C Enterprise Automation Methods
  async listWorkspaces(organizationId?: string) {
    const query = organizationId ? `?organizationId=${organizationId}` : '';
    const res = await fetch(`${API_BASE}/automation/core/workspaces${query}`);
    return res.json();
  },
  async createWorkspace(data: any) {
    const res = await fetch(`${API_BASE}/automation/core/workspaces`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listTriggers(workflowId?: string) {
    const query = workflowId ? `?workflowId=${workflowId}` : '';
    const res = await fetch(`${API_BASE}/automation/core/triggers${query}`);
    return res.json();
  },
  async createTrigger(data: any) {
    const res = await fetch(`${API_BASE}/automation/core/triggers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listBusinessRules(group?: string) {
    const query = group ? `?group=${group}` : '';
    const res = await fetch(`${API_BASE}/automation/core/business-rules${query}`);
    return res.json();
  },
  async createBusinessRule(data: any) {
    const res = await fetch(`${API_BASE}/automation/core/business-rules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listDecisionTables() {
    const res = await fetch(`${API_BASE}/automation/core/decision-tables`);
    return res.json();
  },
  async createDecisionTable(data: any) {
    const res = await fetch(`${API_BASE}/automation/core/decision-tables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
