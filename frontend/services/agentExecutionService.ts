/**
 * Agent Execution Service — NexoApps Phase 8A
 * Frontend API client for Agent Executions, Tools, and Schedules.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const agentExecutionService = {
  async listExecutions(agentId: string = 'all') {
    const res = await fetch(`${API_BASE}/agent-execution/executions/${agentId}`);
    return res.json();
  },
  async runExecution(agentId: string, payload: any = {}) {
    const res = await fetch(`${API_BASE}/agent-execution/run/${agentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  async listTools() {
    const res = await fetch(`${API_BASE}/agent-execution/tools`);
    return res.json();
  },
  async invokeTool(agentId: string, toolName: string, args: any = {}) {
    const res = await fetch(`${API_BASE}/agent-execution/invoke-tool/${agentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolName, arguments: args }),
    });
    return res.json();
  },
  async listSchedules(agentId: string) {
    const res = await fetch(`${API_BASE}/agent-execution/schedules/${agentId}`);
    return res.json();
  },
  async createSchedule(data: any) {
    const res = await fetch(`${API_BASE}/agent-execution/schedules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
