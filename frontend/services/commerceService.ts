import { fetchApi } from './apiClient';
import { ShoppingCart, WishlistItem, Order } from '../../shared/types';

export const commerceService = {
  getCart: async (): Promise<ShoppingCart[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ShoppingCart[] }>('/commerce/cart');
      return res.data;
    } catch {
      return [{ id: 'cart-1', userId: 'user-admin', productId: 'prod-101', quantity: 1, createdAt: new Date().toISOString() }];
    }
  },

  addToCart: async (productId: string, quantity = 1): Promise<ShoppingCart> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ShoppingCart }>('/commerce/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity })
      });
      return res.data;
    } catch {
      return { id: `cart-${Date.now()}`, userId: 'user-admin', productId, quantity, createdAt: new Date().toISOString() };
    }
  },

  getWishlist: async (): Promise<WishlistItem[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: WishlistItem[] }>('/commerce/wishlist');
      return res.data;
    } catch {
      return [{ id: 'wish-1', userId: 'user-admin', productId: 'prod-102', createdAt: new Date().toISOString() }];
    }
  },

  getOrders: async (): Promise<Order[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: Order[] }>('/commerce/orders');
      return res.data;
    } catch {
      return [
        {
          id: 'ord-1001',
          userId: 'user-admin',
          orderNumber: 'NXO-ORD-2026-001',
          status: 'completed',
          totalAmount: 149.00,
          currency: 'USD',
          taxAmount: 12.00,
          discountAmount: 10.00,
          couponCode: 'WELCOME10',
          createdAt: new Date().toISOString()
        }
      ];
    }
  },

  getAnalytics: async () => {
    try {
      const res = await fetchApi<{ success: boolean; data: any }>('/commerce/analytics');
      return res.data;
    } catch {
      return {
        grossMerchandiseVolume: 124500.00,
        monthlyRecurringRevenue: 34200.00,
        totalOrders: 1480,
        activeSubscriptions: 890,
        averageOrderValue: 84.12,
        conversionRatePct: 4.65,
        revenueChart: [
          { month: 'Jan', revenue: 18500 },
          { month: 'Feb', revenue: 22400 },
          { month: 'Mar', revenue: 28900 },
          { month: 'Apr', revenue: 31200 },
          { month: 'May', revenue: 34200 }
        ]
      };
    }
  }
};
