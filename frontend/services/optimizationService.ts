/**
 * Optimization Service — NexoApps Phase 8E
 * Frontend API client for Performance Tuning & Optimization Profiles.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const optimizationService = {
  async getProfiles() {
    const res = await fetch(`${API_BASE}/observability/optimization-profiles`);
    return res.json();
  },
};
