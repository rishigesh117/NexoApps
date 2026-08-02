/**
 * Automation Service — NexoApps Phase 7D
 * Frontend API client for Event Automation, Queues, Workers, and Schedules.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const automationService = {
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
};
