import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { MarketplaceCard } from '../../components/marketplace/MarketplaceCard';
import { getMarketplaceItems } from '../../services/marketplaceService';
import { MarketplaceItem } from '../../types';
import { Store } from 'lucide-react';

export default function AdminMarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);

  useEffect(() => {
    getMarketplaceItems().then((res) => setItems(res.items)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Admin AI Marketplace Console | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Store className="w-6 h-6 text-brand-cyan" /> Enterprise AI Marketplace Administration
          </h1>
          <p className="text-xs text-text-secondary">
            Approve asset submissions, verify creator badges, and moderate AI Marketplace products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <MarketplaceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
