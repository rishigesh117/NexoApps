/**
 * Low-Code Workflow Automation Builder Service
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

class WorkflowBuilderService {
  constructor() {
    this.workflows = [
      {
        id: 'wf-1',
        userId: 'usr-1',
        name: 'Auto APK Verification on Upload',
        triggerType: 'OnUpload',
        actions: ['Validate Package Name', 'Scan Virustotal', 'Notify Owner Slack'],
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'wf-2',
        userId: 'usr-1',
        name: 'Daily Cloud Snapshot Backup',
        triggerType: 'Cron',
        actions: ['Snapshot PostgreSQL Schema', 'Encrypt AES-256', 'Store Cloud Storage'],
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getWorkflows(userId) {
    return this.workflows;
  }

  createWorkflow(userId, data) {
    const newWf = {
      id: `wf-${Date.now()}`,
      userId: userId || 'usr-1',
      name: data.name || 'New Low-Code Workflow',
      triggerType: data.triggerType || 'OnUpload',
      actions: data.actions || ['Log Activity'],
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    this.workflows.unshift(newWf);
    return newWf;
  }
}

module.exports = new WorkflowBuilderService();
