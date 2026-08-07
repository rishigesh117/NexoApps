/**
 * Workspace Service — NexoApps Phase 11D (v8.4)
 * Centralized multi-tenant collaboration workspace management.
 */

class WorkspaceService {
  constructor() {
    this.workspaces = [
      {
        id: 'ws-main',
        workspaceName: 'Nexo Enterprise Collaboration Hub',
        slug: 'nexo-enterprise-hub',
        description: 'Main enterprise digital workplace and collaboration space',
        ownerId: 'user-admin',
        isPrivate: false,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.members = [
      {
        id: 'wm-1',
        workspaceId: 'ws-main',
        userId: 'user-admin',
        role: 'owner',
        joinedAt: new Date().toISOString(),
        status: 'active'
      }
    ];
  }

  async getWorkspaces() {
    return this.workspaces;
  }

  async getWorkspaceById(id) {
    return this.workspaces.find(w => w.id === id) || this.workspaces[0];
  }

  async createWorkspace(data) {
    const newWs = {
      id: `ws-${Date.now()}`,
      workspaceName: data.workspaceName || 'New Workspace',
      slug: data.slug || `workspace-${Date.now()}`,
      description: data.description || '',
      ownerId: data.ownerId || 'user-admin',
      isPrivate: !!data.isPrivate,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.workspaces.push(newWs);
    return newWs;
  }

  async getMembers(workspaceId) {
    return this.members.filter(m => m.workspaceId === workspaceId);
  }

  async addMember(workspaceId, userId, role = 'member') {
    const newMember = {
      id: `wm-${Date.now()}`,
      workspaceId,
      userId,
      role,
      joinedAt: new Date().toISOString(),
      status: 'active'
    };
    this.members.push(newMember);
    return newMember;
  }
}

module.exports = new WorkspaceService();
