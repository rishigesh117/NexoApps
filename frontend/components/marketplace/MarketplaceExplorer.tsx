import React, { useState, useEffect } from 'react';
import { MarketplaceSearch } from './MarketplaceSearch';
import { MarketplaceFilters } from './MarketplaceFilters';
import { MarketplaceItemCard } from './MarketplaceItemCard';
import { marketplaceService } from '../../services/marketplaceService';
import { MarketplaceItem } from '../../../shared/types';

interface MarketplaceExplorerProps {
  initialType?: string;
}

export const MarketplaceExplorer: React.FC<MarketplaceExplorerProps> = ({ initialType }) => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [pricing, setPricing] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [initialType, query, category, pricing]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await marketplaceService.listItems({
        type: initialType,
        category,
        query,
        pricingModel: pricing
      });
      if (res.success) setItems(res.data);
    } catch (err) {
      console.error('Failed to load marketplace items', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <MarketplaceSearch query={query} onQueryChange={setQuery} />
      </div>

      <MarketplaceFilters
        selectedCategory={category}
        onCategorySelect={setCategory}
        selectedPricing={pricing}
        onPricingSelect={setPricing}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MarketplaceItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
