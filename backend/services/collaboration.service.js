/**
 * Collaboration Service — NexoApps Phase 9B
 * Real-time multi-user editing, team permissions & activity logs.
 */

const { v4: uuidv4 } = require('uuid');

class CollaborationService {
  constructor() {
    this.collaborators = [
      { id: 'collab-1', applicationId: 'app-demo-1', userId: 'user-owner', role: 'owner', addedAt: new Date().toISOString() },
      { id: 'collab-2', applicationId: 'app-demo-1', userId: 'user-dev-1', role: 'editor', addedAt: new Date().toISOString() }
    ];

    this.activityLogs = [
      { id: 'log-1', applicationId: 'app-demo-1', userId: 'user-owner', action: 'COMPONENT_ADDED', details: JSON.stringify({ componentName: 'Support Copilot Bot' }), createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 'log-2', applicationId: 'app-demo-1', userId: 'user-dev-1', action: 'WORKFLOW_SAVED', details: JSON.stringify({ workflowName: 'Triage Workflow' }), createdAt: new Date().toISOString() }
    ];
  }

  async listCollaborators(applicationId) {
    if (applicationId) return this.collaborators.filter(c => c.applicationId === applicationId);
    return this.collaborators;
  }

  async addCollaborator(data) {
    const collab = {
      id: `collab-${uuidv4().substring(0, 8)}`,
      applicationId: data.applicationId,
      userId: data.userId,
      role: data.role || 'editor',
      addedAt: new Date().toISOString()
    };
    this.collaborators.push(collab);
    return collab;
  }

  async listActivityLogs(applicationId) {
    if (applicationId) return this.activityLogs.filter(a => a.applicationId === applicationId);
    return this.activityLogs;
  }
}

module.exports = new CollaborationService();
