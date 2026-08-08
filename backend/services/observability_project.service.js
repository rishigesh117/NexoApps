/**
 * Observability Project Service — NexoApps Phase 12C (v9.3)
 * Manage observability projects, environments, ownership, and configuration.
 */

class ObservabilityProjectService {
  constructor() {
    this.projects = [
      {
        id: 'oproj-1',
        workspaceId: 'ws-prod-01',
        name: 'NexoApps Core Production Suite',
        description: 'Primary observability project for NexoApps microservices, API gateways, and databases',
        environment: 'production',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'oproj-2',
        workspaceId: 'ws-staging-01',
        name: 'AI ModelOps Staging Cluster',
        description: 'Observability monitoring project for AI inference, training pipelines, and dataset processing',
        environment: 'staging',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  async getProjects() {
    return this.projects;
  }

  async getProjectById(id) {
    return this.projects.find((p) => p.id === id) || null;
  }

  async createProject(data) {
    const newProject = {
      id: `oproj-${Date.now()}`,
      workspaceId: data.workspaceId || 'ws-prod-01',
      name: data.name,
      description: data.description || '',
      environment: data.environment || 'production',
      status: data.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.projects.push(newProject);
    return newProject;
  }

  async updateProject(id, data) {
    const idx = this.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.projects[idx] = { ...this.projects[idx], ...data, updatedAt: new Date().toISOString() };
    return this.projects[idx];
  }
}

module.exports = new ObservabilityProjectService();
