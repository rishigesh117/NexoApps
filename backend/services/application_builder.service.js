/**
 * Application Builder Service — NexoApps Phase 9B
 * Manages low-code AI applications, components, pages, variables, and settings.
 */

const { v4: uuidv4 } = require('uuid');

class ApplicationBuilderService {
  constructor() {
    this.applications = [
      {
        id: 'app-demo-1',
        ownerId: 'user-owner',
        name: 'Enterprise Customer Copilot',
        slug: 'customer-copilot',
        description: 'AI-powered customer support copilot with knowledge base RAG integration.',
        category: 'Customer Support',
        iconUrl: '/assets/icons/copilot.png',
        status: 'published',
        environment: 'production',
        version: '1.2.0',
        isPublic: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'app-demo-2',
        ownerId: 'user-owner',
        name: 'Automated Code Reviewer',
        slug: 'code-reviewer-app',
        description: 'Low-code AI application analyzing GitHub pull requests and security vulnerability patterns.',
        category: 'Engineering',
        iconUrl: '/assets/icons/code.png',
        status: 'draft',
        environment: 'development',
        version: '0.9.0',
        isPublic: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.pages = [
      { id: 'page-1', applicationId: 'app-demo-1', title: 'Home Dashboard', slug: 'home', isHome: true, layoutConfig: { grid: '12-col' }, createdAt: new Date().toISOString() },
      { id: 'page-2', applicationId: 'app-demo-1', title: 'Knowledge Search', slug: 'search', isHome: false, layoutConfig: { grid: '8-col' }, createdAt: new Date().toISOString() }
    ];

    this.components = [
      { id: 'comp-1', applicationId: 'app-demo-1', pageId: 'page-1', componentType: 'chatbot_builder', name: 'Support Copilot Bot', props: { modelKey: 'gpt-4o', systemPrompt: 'Assist users with orders' }, layoutPosition: { x: 0, y: 0, w: 12, h: 6 }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'comp-2', applicationId: 'app-demo-1', pageId: 'page-1', componentType: 'image_gen_block', name: 'Banner Generator', props: { style: 'vivid', resolution: '1024x1024' }, layoutPosition: { x: 0, y: 6, w: 6, h: 4 }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ];
  }

  async listApplications(ownerId) {
    if (ownerId) {
      return this.applications.filter(a => a.ownerId === ownerId || a.ownerId === 'user-owner');
    }
    return this.applications;
  }

  async getApplicationById(id) {
    const app = this.applications.find(a => a.id === id || a.slug === id);
    if (!app) return null;
    const appPages = this.pages.filter(p => p.applicationId === app.id);
    const appComponents = this.components.filter(c => c.applicationId === app.id);
    return { ...app, pages: appPages, components: appComponents };
  }

  async createApplication(data) {
    const newApp = {
      id: `app-${uuidv4().substring(0, 8)}`,
      ownerId: data.ownerId || 'user-owner',
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      description: data.description || '',
      category: data.category || 'General',
      iconUrl: data.iconUrl || '',
      status: 'draft',
      environment: 'development',
      version: '1.0.0',
      isPublic: data.isPublic || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.applications.push(newApp);

    // Initial page
    const homePage = {
      id: `page-${uuidv4().substring(0, 8)}`,
      applicationId: newApp.id,
      title: 'Main Page',
      slug: 'index',
      isHome: true,
      layoutConfig: { grid: '12-col' },
      createdAt: new Date().toISOString()
    };
    this.pages.push(homePage);

    return { ...newApp, pages: [homePage], components: [] };
  }

  async addComponent(applicationId, data) {
    const comp = {
      id: `comp-${uuidv4().substring(0, 8)}`,
      applicationId,
      pageId: data.pageId,
      componentType: data.componentType,
      name: data.name || 'New Component',
      props: data.props || {},
      layoutPosition: data.layoutPosition || { x: 0, y: 0, w: 6, h: 4 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.components.push(comp);
    return comp;
  }
}

module.exports = new ApplicationBuilderService();
