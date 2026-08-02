/**
 * Reasoning Service — NexoApps Phase 8E
 * Frontend API client for Multi-Step Reasoning Workflows & Tree of Thought.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const reasoningService = {
  async listSessions() {
    const res = await fetch(`${API_BASE}/reasoning/sessions`);
    return res.json();
  },
  async runReasoning(prompt: string) {
    const res = await fetch(`${API_BASE}/reasoning/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    return res.json();
  },
};
