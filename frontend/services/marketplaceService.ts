/**
 * Marketplace Service — NexoApps Phase 9C
 * Frontend API service for browsing, searching, and managing marketplace packages.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const marketplaceService = {
  async listItems(params?: { type?: string; category?: string; query?: string; pricingModel?: string }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/marketplace/items${query ? `?${query}` : ''}`);
    return res.json();
  },

  async getItemById(id: string) {
    const res = await fetch(`${API_BASE}/marketplace/items/${id}`);
    return res.json();
  },

  async createItem(data: any) {
    const res = await fetch(`${API_BASE}/marketplace/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async listCategories() {
    const res = await fetch(`${API_BASE}/marketplace/categories`);
    return res.json();
  },

  async getReviews(itemId: string) {
    const res = await fetch(`${API_BASE}/marketplace/items/${itemId}/reviews`);
    return res.json();
  },

  async addReview(itemId: string, data: any) {
    const res = await fetch(`${API_BASE}/marketplace/items/${itemId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

// Backward compatibility helpers for Phase 5 Marketplace pages
export const getMarketplaceItems = async (type?: string) => {
  const res = await marketplaceService.listItems(type ? { type } : undefined);
  return res.success ? res.data : [];
};

export const getMarketplaceItemById = async (id: string) => {
  const res = await marketplaceService.getItemById(id);
  return res.success ? res.data : null;
};
