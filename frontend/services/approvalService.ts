/**
 * Approval Service — NexoApps Phase 8D
 * Frontend API client for Approval Requests and Sign-Offs.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const approvalService = {
  async listRequests(approverId: string = 'all') {
    const res = await fetch(`${API_BASE}/approvals/requests/${approverId}`);
    return res.json();
  },
  async resolveRequest(id: string, decision: string = 'approved') {
    const res = await fetch(`${API_BASE}/approvals/resolve/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision }),
    });
    return res.json();
  },
};
