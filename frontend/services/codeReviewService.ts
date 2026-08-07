/**
 * Code Review Service — NexoApps Phase 9D
 * Frontend API service for automated code reviews & static analysis.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const codeReviewService = {
  async getCodeReview(projectId: string, branch = 'main') {
    const res = await fetch(`${API_BASE}/software-engineering/studio/projects/${projectId}/code-review?branch=${branch}`);
    return res.json();
  },
};
