/**
 * Testing Service — NexoApps Phase 9D
 * Frontend API service for automated test suite execution.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const testingService = {
  async runTests(projectId: string) {
    const res = await fetch(`${API_BASE}/software-engineering/test-engine/projects/${projectId}/run-tests`);
    return res.json();
  },
};
