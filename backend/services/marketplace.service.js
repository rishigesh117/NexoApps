/**
 * Marketplace Service — NexoApps Phase 9C
 * Manages marketplace items, packages, templates, agents, datasets & extensions.
 */

const { v4: uuidv4 } = require('uuid');

class MarketplaceService {
  constructor() {
    this.items = [
      {
        id: 'item-agent-1',
        publisherId: 'pub-nexo-official',
        title: 'Autonomous DevOps & Kubernetes Agent',
        slug: 'devops-k8s-agent',
        shortDescription: 'Autonomous cluster monitoring, Pod triage, and automated rollback agent.',
        fullDescription: 'Enterprise AI Agent built for Kubernetes clusters with automated health probes and incident remediation.',
        itemType: 'agent',
        category: 'DevOps & Cloud',
        pricingModel: 'freemium',
        priceUsd: 19.99,
        iconUrl: '/assets/icons/k8s-agent.png',
        bannerUrl: '/assets/banners/k8s-agent-banner.png',
        version: '2.1.0',
        downloadCount: 4820,
        ratingAvg: 4.9,
        ratingCount: 128,
        isPublished: true,
        isFeatured: true,
        createdAt: new Date(Date.now() - 864000000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'item-plugin-1',
        publisherId: 'pub-nexo-official',
        title: 'Vector Knowledge RAG Plugin',
        slug: 'vector-rag-plugin',
        shortDescription: 'Deep Pinecone, Qdrant, & PGVector similarity connector plugin.',
        fullDescription: 'High-throughput RAG search plugin connecting enterprise documents directly to LLM completion pipelines.',
        itemType: 'plugin',
        category: 'Data & RAG',
        pricingModel: 'free',
        priceUsd: 0.0,
        iconUrl: '/assets/icons/rag-plugin.png',
        bannerUrl: '/assets/banners/rag-plugin-banner.png',
        version: '1.4.0',
        downloadCount: 8910,
        ratingAvg: 5.0,
        ratingCount: 310,
        isPublished: true,
        isFeatured: true,
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'item-dataset-1',
        publisherId: 'pub-data-labs',
        title: 'OWASP Top 10 Security Audit Dataset',
        slug: 'owasp-security-dataset',
        shortDescription: 'Annotated vulnerability code diff dataset for fine-tuning security models.',
        fullDescription: 'Includes 50,000+ labeled code snippets with remediation examples across Python, TS, Java, and Go.',
        itemType: 'dataset',
        category: 'Security',
        pricingModel: 'paid',
        priceUsd: 49.0,
        iconUrl: '/assets/icons/security-dataset.png',
        bannerUrl: '/assets/banners/security-dataset-banner.png',
        version: '3.0.0',
        downloadCount: 1250,
        ratingAvg: 4.8,
        ratingCount: 45,
        isPublished: true,
        isFeatured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.categories = [
      { id: 'cat-agents', name: 'AI Agents', slug: 'ai-agents', description: 'Autonomous agent swarms & assistants', iconName: 'Bot' },
      { id: 'cat-plugins', name: 'Plugins & Connectors', slug: 'plugins', description: 'Third-party API & tool plugins', iconName: 'Boxes' },
      { id: 'cat-workflows', name: 'Workflows', slug: 'workflows', description: 'Visual automation workflow templates', iconName: 'Layers' },
      { id: 'cat-datasets', name: 'Datasets', slug: 'datasets', description: 'Fine-tuning & benchmark data packages', iconName: 'Database' },
      { id: 'cat-templates', name: 'App Templates', slug: 'templates', description: 'Low-code AI application starter kits', iconName: 'Store' },
      { id: 'cat-extensions', name: 'Extensions', slug: 'extensions', description: 'NexoApps Platform SDK extension packages', iconName: 'Globe' }
    ];
  }

  async listItems(type, category) {
    let result = this.items.filter(i => i.isPublished);
    if (type) result = result.filter(i => i.itemType === type);
    if (category && category !== 'All') result = result.filter(i => i.category === category);
    return result;
  }

  async getItemById(id) {
    return this.items.find(i => i.id === id || i.slug === id);
  }

  async createItem(data) {
    const item = {
      id: `item-${data.itemType || 'package'}-${uuidv4().substring(0, 8)}`,
      publisherId: data.publisherId || 'pub-nexo-official',
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-'),
      shortDescription: data.shortDescription || '',
      fullDescription: data.fullDescription || '',
      itemType: data.itemType || 'agent',
      category: data.category || 'General',
      pricingModel: data.pricingModel || 'free',
      priceUsd: data.priceUsd || 0.0,
      iconUrl: data.iconUrl || '',
      bannerUrl: data.bannerUrl || '',
      version: '1.0.0',
      downloadCount: 0,
      ratingAvg: 5.0,
      ratingCount: 0,
      isPublished: true,
      isFeatured: data.isFeatured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.items.push(item);
    return item;
  }

  async listCategories() {
    return this.categories;
  }
}

module.exports = new MarketplaceService();
