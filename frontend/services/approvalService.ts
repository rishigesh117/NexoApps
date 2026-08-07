/**
 * Approval Service — NexoApps Phase 11C
 * Frontend API client for Approval Requests, Workflows, and Sign-Offs.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const approvalService = {
  async listRequests(approverId: string = 'all') {
    const res = await fetch(`${API_BASE}/approvals/requests/${approverId}`);
    return res.json();
  },
  async resolveRequest(id: string, decision: string = 'approved', comment: string = '') {
    const res = await fetch(`${API_BASE}/approvals/resolve/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision, comment }),
    });
    return res.json();
  },

  // Phase 11C Extensions
  async listWorkflows() {
    const res = await fetch(`${API_BASE}/automation/approvals/workflows`);
    return res.json();
  },
  async createApprovalRequest(data: any) {
    const res = await fetch(`${API_BASE}/automation/approvals/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async recordAction(requestId: string, approverId: string, action: string, comment?: string) {
    const res = await fetch(`${API_BASE}/automation/approvals/requests/${requestId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approverId, action, comment }),
    });
    return res.json();
  },
};
