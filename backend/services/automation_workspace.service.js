/**
 * Automation Workspace Service — NexoApps Phase 11C
 * Version 8.3
 */

const { v4: uuidv4 } = require('uuid');

class AutomationWorkspaceService {
  async listWorkspaces(organizationId) {
    return [
      {
        id: 'ws-101',
        workspaceName: 'Global Operations Workspace',
        description: 'Enterprise workflow automation for core business operations',
        organizationId: organizationId || 'org-1',
        ownerId: 'usr-admin-1',
        status: 'active',
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'ws-102',
        workspaceName: 'Finance & Compliance Orchestration',
        description: 'Automated invoice approvals, payroll audits, and regulatory checks',
        organizationId: organizationId || 'org-1',
        ownerId: 'usr-fin-lead',
        status: 'active',
        createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  async getWorkspaceById(id) {
    const list = await this.listWorkspaces();
    return list.find((w) => w.id === id) || {
      id,
      workspaceName: 'Enterprise Automation Workspace',
      description: 'Intelligent business process orchestration',
      organizationId: 'org-1',
      ownerId: 'usr-admin-1',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async createWorkspace(data) {
    return {
      id: `ws-${uuidv4().substring(0, 8)}`,
      workspaceName: data.workspaceName || 'New Automation Workspace',
      description: data.description || '',
      organizationId: data.organizationId || 'org-1',
      ownerId: data.ownerId || 'usr-admin-1',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async listProjects(workspaceId) {
    return [
      {
        id: 'proj-201',
        workspaceId: workspaceId || 'ws-101',
        projectName: 'Customer Onboarding Pipeline',
        description: 'End-to-end automated customer registration and validation',
        category: 'customer_ops',
        status: 'active',
        createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'proj-202',
        workspaceId: workspaceId || 'ws-101',
        projectName: 'RPA Document Processing',
        description: 'Robotic OCR extraction and ERP synchronization',
        category: 'rpa_automation',
        status: 'active',
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  async createProject(data) {
    return {
      id: `proj-${uuidv4().substring(0, 8)}`,
      workspaceId: data.workspaceId || 'ws-101',
      projectName: data.projectName || 'New Automation Project',
      description: data.description || '',
      category: data.category || 'general',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

module.exports = new AutomationWorkspaceService();
