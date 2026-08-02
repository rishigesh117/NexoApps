/**
 * Universal Cross-Platform Search Service
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

class PlatformSearchService {
  constructor() {
    this.index = [
      { id: 's-1', title: 'Batlytics AI Match Predictor', category: 'AGENTS', url: '/agents/chat', keywords: 'cricket match predictions ai agent' },
      { id: 's-2', title: 'Nexo-LLM 7B Instruct Model', category: 'PLATFORM', url: '/ai-platform/models', keywords: 'llm model fine-tune pytorch' },
      { id: 's-3', title: 'SaaS Multi-Tenant Starter Template', category: 'MARKETPLACE', url: '/marketplace/templates', keywords: 'starter template saas nextjs' },
      { id: 's-4', title: 'Automated Code Review Hub', category: 'AGENTS', url: '/agents/reviews', keywords: 'code review bug detection agent' },
      { id: 's-5', title: 'Cloud Sync & Device Manager', category: 'CLOUD', url: '/devices', keywords: 'cloud sync backup devices' },
      { id: 's-6', title: 'AI Builder Component Studio', category: 'BUILDER', url: '/builder', keywords: 'ai builder component scaffolding' },
    ];
  }

  search(query) {
    if (!query || !query.trim()) return this.index;
    const q = query.toLowerCase();
    return this.index.filter(
      (item) => item.title.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }
}

module.exports = new PlatformSearchService();
