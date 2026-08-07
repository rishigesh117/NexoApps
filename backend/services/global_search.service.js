/**
 * Global Search Service — NexoApps Phase 9E
 * Universal cross-module indexing and search engine across AI OS.
 */

class GlobalSearchService {
  constructor() {
    this.index = [
      { id: 'search-1', entityId: 'proj-demo-1', entityType: 'software_project', title: 'Autonomous Fintech API Engine', description: 'Microservices payment backend engine', targetUrl: '/software-engineering/projects' },
      { id: 'search-2', entityId: 'app-demo-1', entityType: 'ai_application', title: 'Enterprise Customer Support Bot', description: 'Low-code AI application created in Studio', targetUrl: '/app-builder' },
      { id: 'search-3', entityId: 'item-demo-1', entityType: 'marketplace_item', title: 'GPT-4o Vision Legal Analyzer Agent', description: 'Published AI agent in Nexo Marketplace', targetUrl: '/marketplace' },
      { id: 'search-4', entityId: 'gateway-1', entityType: 'ai_gateway', title: 'Universal AI Gateway & LLM Router', description: 'Multi-provider AI model gateway', targetUrl: '/ai-gateway' }
    ];
  }

  async search(query = '') {
    if (!query.trim()) return this.index;
    const q = query.toLowerCase();
    return this.index.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.entityType.toLowerCase().includes(q)
    );
  }
}

module.exports = new GlobalSearchService();
