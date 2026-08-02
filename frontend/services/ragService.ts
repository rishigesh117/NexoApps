/**
 * RAG Service — NexoApps Phase 8C
 * Frontend API client for Retrieval-Augmented Generation sessions and Q&A.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const ragService = {
  async listSessions(knowledgeBaseId: string = 'default') {
    const res = await fetch(`${API_BASE}/rag/sessions/${knowledgeBaseId}`);
    return res.json();
  },
  async askQuestion(sessionId: string, prompt: string, knowledgeBaseId: string = 'default') {
    const res = await fetch(`${API_BASE}/rag/sessions/${sessionId}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, knowledgeBaseId }),
    });
    return res.json();
  },
};
