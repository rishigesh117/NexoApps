/**
 * AI Marketplace Catalog & Search Service
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

class MarketplaceService {
  constructor() {
    this.items = [
      {
        id: 'mk-1',
        creatorId: 'c-1',
        creatorName: 'Rishigesh Team',
        creatorUsername: 'rishigesh',
        title: 'Batlytics AI Match Predictor & Analytics Agent',
        slug: 'batlytics-ai-match-predictor',
        type: 'AGENT',
        shortDescription: 'Autonomous cricket match analysis, win-probability calculator, and ball-by-ball strategy agent.',
        fullDescription: 'Production-ready AI agent fine-tuned on 15,000 professional cricket matches.',
        price: 29.00,
        pricingModel: 'ONE_TIME',
        ratingAvg: 4.90,
        downloadsCount: 1420,
        isFeatured: true,
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      },
      {
        id: 'mk-2',
        creatorId: 'c-2',
        creatorName: 'Nexo AI Labs',
        creatorUsername: 'nexo-labs',
        title: 'Nexo-LLM 7B Code & UI Generator Model',
        slug: 'nexo-llm-7b-code-generator',
        type: 'MODEL',
        shortDescription: '7B parameter fine-tuned model for React component generation, Express APIs, and TypeScript code reviews.',
        fullDescription: 'Optimized ONNX / PyTorch weights artifact compatible with edge GPU clusters.',
        price: 0.00,
        pricingModel: 'FREE',
        ratingAvg: 4.95,
        downloadsCount: 3850,
        isFeatured: true,
        createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
      },
      {
        id: 'mk-3',
        creatorId: 'c-1',
        creatorName: 'Rishigesh Team',
        creatorUsername: 'rishigesh',
        title: 'SaaS Multi-Tenant Enterprise Starter Template',
        slug: 'saas-multi-tenant-enterprise-template',
        type: 'TEMPLATE',
        shortDescription: 'Complete Next.js + Express + Tailwind + Postgres SaaS starter project with Auth, Billing & Admin UI.',
        fullDescription: 'Full production template with zero TypeScript errors and complete CI/CD scripts.',
        price: 49.00,
        pricingModel: 'ONE_TIME',
        ratingAvg: 4.85,
        downloadsCount: 890,
        isFeatured: true,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      },
    ];
  }

  getItems(type) {
    if (type) {
      return this.items.filter((i) => i.type === type.toUpperCase());
    }
    return this.items;
  }

  getItemById(id) {
    return this.items.find((i) => i.id === id || i.slug === id) || this.items[0];
  }

  publishItem(creatorId, data) {
    const slug = (data.title || 'ai-item').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newItem = {
      id: `mk-${Date.now()}`,
      creatorId: creatorId || 'c-1',
      creatorName: 'Developer Creator',
      creatorUsername: 'devcreator',
      title: data.title || 'New AI Marketplace Item',
      slug,
      type: data.type || 'AGENT',
      shortDescription: data.shortDescription || 'High-performance AI marketplace artifact.',
      fullDescription: data.fullDescription || 'Complete production asset with docs.',
      price: data.price || 0.00,
      pricingModel: data.price > 0 ? 'ONE_TIME' : 'FREE',
      ratingAvg: 5.00,
      downloadsCount: 1,
      isFeatured: false,
      createdAt: new Date().toISOString(),
    };
    this.items.unshift(newItem);
    return newItem;
  }

  getStats() {
    return {
      totalItems: this.items.length,
      totalDownloads: 6160,
      totalCreators: 48,
      activeSubscriptions: 215,
    };
  }
}

module.exports = new MarketplaceService();
