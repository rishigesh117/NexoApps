/**
 * Knowledge Service — NexoApps Phase 8C
 * Frontend API client for Enterprise Knowledge Bases, Documents, and Indexes.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const knowledgeService = {
  async listBases() {
    const res = await fetch(`${API_BASE}/knowledge/bases`);
    return res.json();
  },
  async getBase(id: string) {
    const res = await fetch(`${API_BASE}/knowledge/bases/${id}`);
    return res.json();
  },
  async createBase(data: any) {
    const res = await fetch(`${API_BASE}/knowledge/bases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listDocuments(knowledgeBaseId: string) {
    const res = await fetch(`${API_BASE}/knowledge/bases/${knowledgeBaseId}/documents`);
    return res.json();
  },
  async uploadDocument(knowledgeBaseId: string, data: any) {
    const res = await fetch(`${API_BASE}/knowledge/bases/${knowledgeBaseId}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async listIndexes(knowledgeBaseId: string) {
    const res = await fetch(`${API_BASE}/knowledge/bases/${knowledgeBaseId}/indexes`);
    return res.json();
  },
  async createIndex(knowledgeBaseId: string, indexName: string) {
    const res = await fetch(`${API_BASE}/knowledge/bases/${knowledgeBaseId}/indexes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ indexName }),
    });
    return res.json();
  },
  async getStatistics(knowledgeBaseId: string) {
    const res = await fetch(`${API_BASE}/knowledge/bases/${knowledgeBaseId}/statistics`);
    return res.json();
  },
};
