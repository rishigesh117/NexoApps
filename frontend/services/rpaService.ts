/**
 * RPA Service — NexoApps Phase 11C
 * Frontend API client for Robotic Process Automation Bots & Jobs.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const rpaService = {
  async listBots() {
    const res = await fetch(`${API_BASE}/automation/rpa/bots`);
    return res.json();
  },
  async createBot(data: any) {
    const res = await fetch(`${API_BASE}/automation/rpa/bots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listJobs(botId: string) {
    const res = await fetch(`${API_BASE}/automation/rpa/bots/${botId}/jobs`);
    return res.json();
  },
  async triggerJob(botId: string, jobName: string, parameters: any = {}) {
    const res = await fetch(`${API_BASE}/automation/rpa/bots/${botId}/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobName, parameters }),
    });
    return res.json();
  },
};
