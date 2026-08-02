/**
 * Template Marketplace Service
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

class TemplateService {
  constructor() {
    this.templates = [
      {
        id: 'tmpl-1',
        title: 'Batlytics Sports Scoring Suite',
        slug: 'batlytics-sports-scoring-suite',
        category: 'Sports & Gaming',
        description: 'Complete cricket scoring app with live scorecards, player statistics, and match graphs.',
        icon: '🏏',
        starsCount: 142,
        downloadsCount: 1250,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'tmpl-2',
        title: 'AI LLM Chat Interface Template',
        slug: 'ai-llm-chat-interface-template',
        category: 'AI & Machine Learning',
        description: 'Glassmorphic ChatGPT/Claude style streaming interface component library.',
        icon: '🤖',
        starsCount: 389,
        downloadsCount: 3400,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'tmpl-3',
        title: 'Enterprise Multi-Tenant SaaS Boilerplate',
        slug: 'enterprise-saas-boilerplate',
        category: 'Enterprise SaaS',
        description: 'Next.js 14, Tailwind, AuthContext, PostgreSQL schema, and Team Organization Workspaces.',
        icon: '⚡',
        starsCount: 512,
        downloadsCount: 4800,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getTemplates() {
    return this.templates;
  }
}

module.exports = new TemplateService();
