/**
 * Approval Service — NexoApps Phase 11C
 * Multi-tier approval workflows, sign-offs, and automated delegation chains (Version 8.3)
 */

const { v4: uuidv4 } = require('uuid');

class ApprovalService {
  // Legacy methods preserved for backward compatibility
  async listRequests(approverId) {
    return [
      { id: 'appr-req-1', workflowId: 'wf-101', requesterId: 'emp-alex', approverId: approverId || 'admin', status: 'pending', title: 'Cloud Expansion Budget', details: 'Budget approval for $45,000 cloud infrastructure expansion', entityType: 'budget', entityId: 'bgt-991', requestedAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 'appr-req-2', workflowId: 'wf-102', requesterId: 'emp-felix', approverId: approverId || 'admin', status: 'approved', title: 'Quarterly Compliance Signoff', details: 'Quarterly compliance audit sign-off', entityType: 'audit', entityId: 'aud-442', requestedAt: new Date(Date.now() - 86400000).toISOString(), resolvedAt: new Date(Date.now() - 43200000).toISOString() },
    ];
  }

  async resolveRequest(requestId, decision, comment = '') {
    return {
      id: requestId,
      status: decision || 'approved',
      comment,
      resolvedAt: new Date().toISOString(),
    };
  }

  // Phase 11C Methods
  async listWorkflows() {
    return [
      {
        id: 'appr-wf-701',
        workflowName: 'Executive Capital Expenditure Sign-off',
        description: 'Multi-stage approval for purchases > $10,000',
        approverRoles: ['department_head', 'finance_vp', 'cfo'],
        requireAll: true,
        autoRejectTimeoutHours: 72,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'appr-wf-702',
        workflowName: 'Software Access Request Workflow',
        description: 'Automated role-based sign-off for enterprise SaaS applications',
        approverRoles: ['team_lead', 'secops_manager'],
        requireAll: false,
        autoRejectTimeoutHours: 24,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async createApprovalRequest(data) {
    return {
      id: `appr-req-${uuidv4().substring(0, 8)}`,
      approvalWorkflowId: data.approvalWorkflowId || 'appr-wf-701',
      requesterId: data.requesterId || 'usr-user-1',
      entityType: data.entityType || 'purchase_order',
      entityId: data.entityId || `po-${uuidv4().substring(0, 6)}`,
      status: 'pending',
      title: data.title || 'New Approval Request',
      details: data.details || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async recordAction(requestId, approverId, action, comment = '') {
    return {
      id: `act-${uuidv4().substring(0, 8)}`,
      requestId,
      approverId,
      action, // 'approved' | 'rejected' | 'commented'
      comment,
      createdAt: new Date().toISOString(),
    };
  }
}

module.exports = new ApprovalService();
