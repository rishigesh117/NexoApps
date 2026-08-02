/**
 * Semantic Search Service — NexoApps Phase 8C
 * Frontend API client for Vector Search and Hybrid Keyword-Dense Retrieval.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const semanticSearchService = {
  async search(query: string, knowledgeBaseId: string = 'default', topK: number = 5) {
    const res = await fetch(`${API_BASE}/knowledge/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, knowledgeBaseId, topK }),
    });
    return res.json();
  },
};
