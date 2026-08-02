import { fetchApi } from './apiClient';
import { MarketplaceItem, MarketplaceStatistics, MarketplaceCollection } from '../types';

export async function getMarketplaceItems(type?: string): Promise<{ items: MarketplaceItem[]; stats: MarketplaceStatistics }> {
  const query = type ? `?type=${type}` : '';
  const res = await fetchApi<{ success: boolean; data: { items: MarketplaceItem[]; stats: MarketplaceStatistics } }>(`/marketplace/items${query}`);
  return res.data || { items: [], stats: { totalItems: 0, totalDownloads: 0, totalCreators: 0, activeSubscriptions: 0 } };
}

export async function getMarketplaceItemById(id: string): Promise<MarketplaceItem> {
  const res = await fetchApi<{ success: boolean; data: MarketplaceItem }>(`/marketplace/items/${id}`);
  return res.data;
}

export async function publishMarketplaceItem(data: Partial<MarketplaceItem>): Promise<MarketplaceItem> {
  const res = await fetchApi<{ success: boolean; data: MarketplaceItem }>('/marketplace/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function getFeaturedCollections(): Promise<MarketplaceCollection[]> {
  const res = await fetchApi<{ success: boolean; data: MarketplaceCollection[] }>('/marketplace/collections');
  return res.data || [];
}
