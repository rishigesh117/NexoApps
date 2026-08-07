/**
 * Documentation Service — NexoApps Phase 9D
 * Frontend API service for README & API documentation generation.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const documentationService = {
  async getDocs(projectId: string) {
    const res = await fetch(`${API_BASE}/software-engineering/studio/projects/${projectId}/documentation`);
    return res.json();
  },
};
