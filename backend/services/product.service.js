/**
 * Product Service — NexoApps Phase 10A
 * Manages digital products, pricing tiers, and marketplace catalog.
 */

class ProductService {
  constructor() {
    this.categories = [
      { id: 'cat-1', name: 'AI Models', slug: 'ai-models', description: 'Pre-trained and fine-tuned AI neural models', icon: 'Brain' },
      { id: 'cat-2', name: 'Developer Tools', slug: 'developer-tools', description: 'APIs, SDKs, and workflow integrations', icon: 'Code' },
      { id: 'cat-3', name: 'SaaS Templates', slug: 'saas-templates', description: 'Full-stack application starters', icon: 'Layout' }
    ];
    this.products = [
      {
        id: 'prod-101',
        sellerId: 'seller-1',
        title: 'NexoVision Pro AI Vision Model',
        slug: 'nexovision-pro',
        description: 'Ultra-fast real-time vision analytics model for enterprise automation.',
        categoryId: 'cat-1',
        productType: 'ai_model',
        status: 'published',
        iconUrl: '/assets/icons/ai-vision.svg',
        rating: 4.9,
        totalReviews: 128,
        isFeatured: true,
        pricing: [{ id: 'p-1', productId: 'prod-101', pricingModel: 'one_time', price: 149.00, currency: 'USD', isActive: true }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'prod-102',
        sellerId: 'seller-1',
        title: 'Autonomous Code Refactoring Agent API',
        slug: 'code-refactor-agent',
        description: 'Automated static code quality analysis and optimization service.',
        categoryId: 'cat-2',
        productType: 'api_subscription',
        status: 'published',
        iconUrl: '/assets/icons/code-agent.svg',
        rating: 4.8,
        totalReviews: 95,
        isFeatured: true,
        pricing: [{ id: 'p-2', productId: 'prod-102', pricingModel: 'recurring', price: 49.00, currency: 'USD', billingInterval: 'monthly', isActive: true }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  async getProducts(params = {}) {
    let result = [...this.products];
    if (params.category) {
      result = result.filter(p => p.categoryId === params.category);
    }
    if (params.featured) {
      result = result.filter(p => p.isFeatured);
    }
    return result;
  }

  async getProductBySlug(slug) {
    return this.products.find(p => p.slug === slug || p.id === slug) || this.products[0];
  }

  async getCategories() {
    return this.categories;
  }

  async createProduct(productData) {
    const product = {
      id: `prod-${Date.now()}`,
      sellerId: productData.sellerId || 'seller-1',
      title: productData.title || 'New Digital Product',
      slug: productData.slug || `prod-${Date.now()}`,
      description: productData.description || '',
      categoryId: productData.categoryId || 'cat-1',
      productType: productData.productType || 'digital_app',
      status: 'published',
      rating: 5.0,
      totalReviews: 0,
      isFeatured: false,
      pricing: productData.pricing || [{ id: `p-${Date.now()}`, pricingModel: 'one_time', price: 29.00, currency: 'USD', isActive: true }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.products.push(product);
    return product;
  }
}

module.exports = new ProductService();
