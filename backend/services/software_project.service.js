/**
 * Software Project Service — NexoApps Phase 9D
 * Manages autonomous software projects, metadata, tech stacks & lifecycle.
 */

const { v4: uuidv4 } = require('uuid');

class SoftwareProjectService {
  constructor() {
    this.projects = [
      {
        id: 'proj-demo-1',
        ownerId: 'user-owner',
        name: 'Autonomous Fintech API Engine',
        slug: 'fintech-api-engine',
        description: 'Microservice backend built with Express, TypeScript, and SQLite for high-speed payment processing.',
        techStack: 'Express, TypeScript, SQLite, Docker, Jest',
        architecturePattern: 'microservices',
        status: 'active',
        createdAt: new Date(Date.now() - 864000000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'proj-demo-2',
        ownerId: 'user-owner',
        name: 'AI Analytics Real-time Dashboard',
        slug: 'ai-analytics-dashboard',
        description: 'Full-stack Next.js 14 Web App with WebSocket live telemetry and Tailwind UI.',
        techStack: 'Next.js, React, TailwindCSS, WebSocket, Chart.js',
        architecturePattern: 'monolith',
        status: 'active',
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  async listProjects(ownerId) {
    if (ownerId) return this.projects.filter(p => p.ownerId === ownerId || p.ownerId === 'user-owner');
    return this.projects;
  }

  async getProjectById(id) {
    return this.projects.find(p => p.id === id || p.slug === id);
  }

  async createProject(data) {
    const proj = {
      id: `proj-${uuidv4().substring(0, 8)}`,
      ownerId: data.ownerId || 'user-owner',
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      description: data.description || '',
      techStack: data.techStack || 'Express, TypeScript, SQLite',
      architecturePattern: data.architecturePattern || 'microservices',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.projects.push(proj);
    return proj;
  }
}

module.exports = new SoftwareProjectService();
