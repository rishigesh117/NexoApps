import { fetchApi } from './apiClient';
import { Product, ProductCategory } from '../../shared/types';

export const productService = {
  getProducts: async (query?: Record<string, string>): Promise<Product[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: Product[] }>('/commerce/products');
      return res.data;
    } catch {
      return [
        {
          id: 'prod-101',
          sellerId: 'seller-1',
          title: 'NexoVision Pro AI Vision Model',
          slug: 'nexovision-pro',
          description: 'Ultra-fast real-time vision analytics model for enterprise automation.',
          categoryId: 'cat-1',
          productType: 'ai_model',
          status: 'published',
          rating: 4.9,
          totalReviews: 128,
          isFeatured: true,
          pricing: [{ id: 'p-1', productId: 'prod-101', pricingModel: 'one_time', price: 149.00, currency: 'USD', isActive: true, createdAt: new Date().toISOString() }],
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
          rating: 4.8,
          totalReviews: 95,
          isFeatured: true,
          pricing: [{ id: 'p-2', productId: 'prod-102', pricingModel: 'recurring', price: 49.00, currency: 'USD', billingInterval: 'monthly', isActive: true, createdAt: new Date().toISOString() }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    }
  },

  getCategories: async (): Promise<ProductCategory[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ProductCategory[] }>('/commerce/products/categories');
      return res.data;
    } catch {
      return [
        { id: 'cat-1', name: 'AI Models', slug: 'ai-models', description: 'Pre-trained AI neural models', icon: 'Brain', createdAt: new Date().toISOString() },
        { id: 'cat-2', name: 'Developer Tools', slug: 'developer-tools', description: 'APIs & integrations', icon: 'Code', createdAt: new Date().toISOString() }
      ];
    }
  }
};
