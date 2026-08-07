import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { recommendationService } from '../../services/recommendationService';
import { MarketplaceItemCard } from './MarketplaceItemCard';

export const RecommendationCarousel: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchRecs();
  }, []);

  const fetchRecs = async () => {
    try {
      const res = await recommendationService.getRecommendations();
      if (res.success) setItems(res.data.trending || []);
    } catch (err) {
      console.error('Failed to load recommendations', err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-brand-cyan" />
        AI Personalized Recommendations & Trending Packages
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <MarketplaceItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
