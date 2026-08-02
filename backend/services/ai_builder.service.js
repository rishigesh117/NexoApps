/**
 * AI Builder Core Service
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

class AIBuilderService {
  constructor() {
    this.projects = [
      {
        id: 'aip-101',
        userId: 'usr-1',
        name: 'Batlytics AI Cricket Scorer',
        slug: 'batlytics-ai-cricket-scorer',
        description: 'Full-stack AI app template with real-time scoring, predictive match outcome charts, and Bluetooth hardware sync.',
        framework: 'Next.js 14 (App Router)',
        language: 'TypeScript',
        styling: 'TailwindCSS / Glassmorphism',
        status: 'Completed',
        promptUsed: 'Build a Next.js cricket scoring app with real-time analytics and scorecards.',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date().toISOString(),
        filesCount: 14,
      },
      {
        id: 'aip-102',
        userId: 'usr-1',
        name: 'SaaS Subscription Dashboard',
        slug: 'saas-subscription-dashboard',
        description: 'Multi-tenant SaaS subscription billing dashboard template.',
        framework: 'Next.js 14',
        language: 'TypeScript',
        styling: 'TailwindCSS',
        status: 'Draft',
        promptUsed: 'Generate a SaaS billing dashboard with Stripe integration placeholder.',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date().toISOString(),
        filesCount: 8,
      },
    ];

    this.promptsHistory = [
      {
        id: 'prm-1',
        userId: 'usr-1',
        projectId: 'aip-101',
        promptText: 'Create a cricket scoring component with run rate calculation',
        responseSummary: 'Generated Scoreboard.tsx with run rate and over calculator.',
        tokensUsed: 1250,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getProjects(userId) {
    return this.projects;
  }

  getProjectById(id) {
    return this.projects.find((p) => p.id === id) || null;
  }

  createProject(userId, data) {
    const slug = (data.name || 'ai-app').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProj = {
      id: `aip-${Date.now()}`,
      userId: userId || 'usr-1',
      name: data.name || 'New AI Generated App',
      slug,
      description: data.description || 'Generated with NexoApps Prompt-to-App engine.',
      framework: data.framework || 'Next.js 14',
      language: data.language || 'TypeScript',
      styling: data.styling || 'TailwindCSS / Glassmorphism',
      status: 'Completed',
      promptUsed: data.prompt || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filesCount: 6,
    };
    this.projects.unshift(newProj);
    return newProj;
  }

  getPromptHistory(userId) {
    return this.promptsHistory;
  }
}

module.exports = new AIBuilderService();
