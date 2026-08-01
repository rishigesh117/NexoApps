/**
 * Organization Project Service
 * NexoApps Platform - Phase 5D
 */

class ProjectService {
  constructor() {
    this.projects = [
      {
        id: 'proj-1',
        organizationId: 'org-101',
        name: 'Batlytics Android Engine',
        slug: 'batlytics-android-engine',
        description: 'Core real-time ball-by-ball cricket scoring engine for Android 14.',
        status: 'Active',
        category: 'Android App',
        createdBy: 'usr-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        membersCount: 4,
        filesCount: 8,
      },
      {
        id: 'proj-2',
        organizationId: 'org-101',
        name: 'Live Bluetooth Scorekeeper Hardware Sync',
        slug: 'bluetooth-scorekeeper-sync',
        description: 'Firmware & Bluetooth Low Energy protocol bridge for electronic scoreboard hardware.',
        status: 'Planning',
        category: 'IoT / Firmware',
        createdBy: 'usr-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        membersCount: 2,
        filesCount: 3,
      },
      {
        id: 'proj-3',
        organizationId: 'org-101',
        name: 'Worm & Manhattan Chart Web Renderer',
        slug: 'chart-renderer-web',
        description: 'High-performance Canvas / SVG chart renderer module.',
        status: 'Completed',
        category: 'Web Module',
        createdBy: 'usr-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        membersCount: 3,
        filesCount: 5,
      },
    ];
  }

  getProjects(organizationId) {
    if (!organizationId) return this.projects;
    return this.projects.filter((p) => p.organizationId === organizationId);
  }

  createProject(organizationId, data, userId) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProject = {
      id: `proj-${Date.now()}`,
      organizationId,
      name: data.name,
      slug,
      description: data.description || '',
      status: data.status || 'Active',
      category: data.category || 'Android App',
      createdBy: userId || 'usr-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      membersCount: 1,
      filesCount: 0,
    };
    this.projects.unshift(newProject);
    return newProject;
  }
}

module.exports = new ProjectService();
