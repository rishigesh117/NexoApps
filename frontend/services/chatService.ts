/**
 * Chat Service — NexoApps Phase 9A
 * Frontend API service for chat sessions and messaging.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const chatService = {
  async listSessions(userId?: string) {
    const query = userId ? `?userId=${userId}` : '';
    const res = await fetch(`${API_BASE}/ai-gateway/chat/sessions${query}`);
    return res.json();
  },

  async createSession(data: any) {
    const res = await fetch(`${API_BASE}/ai-gateway/chat/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getSessionMessages(sessionId: string) {
    const res = await fetch(`${API_BASE}/ai-gateway/chat/sessions/${sessionId}/messages`);
    return res.json();
  },

  async sendMessage(data: { sessionId: string; content: string; modelKey?: string; multimodalAssets?: string[] }) {
    const res = await fetch(`${API_BASE}/ai-gateway/chat/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
