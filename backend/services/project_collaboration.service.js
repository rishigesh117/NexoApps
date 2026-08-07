/**
 * Project Collaboration Service — NexoApps Phase 11D (v8.4)
 * Handles project spaces, project tasks, and milestones.
 */

class ProjectCollaborationService {
  constructor() {
    this.projects = [
      {
        id: 'proj-1',
        workspaceId: 'ws-main',
        projectName: 'Version 8.4 AI Collaboration Platform Launch',
        description: 'Coordinating team tasks, milestones, and releases for Phase 11D',
        leadId: 'user-admin',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ];

    this.tasks = [
      {
        id: 'task-1',
        projectSpaceId: 'proj-1',
        title: 'Backend Routes & Controllers Verification',
        description: 'Verify 0 syntax errors across collaboration routes and controllers',
        assigneeId: 'user-dev',
        priority: 'high',
        status: 'done',
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        createdBy: 'user-admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'task-2',
        projectSpaceId: 'proj-1',
        title: 'Frontend Components & Pages Assembly',
        description: 'Ensure 0 TypeScript errors during compilation of collaboration UI',
        assigneeId: 'user-dev',
        priority: 'urgent',
        status: 'in_progress',
        dueDate: new Date(Date.now() + 172800000).toISOString(),
        createdBy: 'user-admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.milestones = [
      {
        id: 'ms-1',
        projectSpaceId: 'proj-1',
        milestoneName: '100% Backward Compatibility & 0 Compiler Errors',
        dueDate: new Date(Date.now() + 259200000).toISOString(),
        status: 'achieved',
        createdAt: new Date().toISOString()
      }
    ];
  }

  async getProjectSpaces(workspaceId) {
    return this.projects.filter(p => p.workspaceId === workspaceId || !workspaceId);
  }

  async createProjectSpace(data) {
    const proj = {
      id: `proj-${Date.now()}`,
      workspaceId: data.workspaceId || 'ws-main',
      projectName: data.projectName || 'New Project Space',
      description: data.description || '',
      leadId: data.leadId || 'user-admin',
      status: 'active',
      createdAt: new Date().toISOString()
    };
    this.projects.push(proj);
    return proj;
  }

  async getProjectTasks(projectSpaceId) {
    return this.tasks.filter(t => t.projectSpaceId === projectSpaceId || !projectSpaceId);
  }

  async createProjectTask(data) {
    const task = {
      id: `task-${Date.now()}`,
      projectSpaceId: data.projectSpaceId || 'proj-1',
      title: data.title || 'Untitled Task',
      description: data.description || '',
      assigneeId: data.assigneeId || 'user-dev',
      priority: data.priority || 'medium',
      status: data.status || 'todo',
      dueDate: data.dueDate || new Date(Date.now() + 604800000).toISOString(),
      createdBy: data.createdBy || 'user-admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.tasks.push(task);
    return task;
  }

  async getProjectMilestones(projectSpaceId) {
    return this.milestones.filter(m => m.projectSpaceId === projectSpaceId || !projectSpaceId);
  }
}

module.exports = new ProjectCollaborationService();
