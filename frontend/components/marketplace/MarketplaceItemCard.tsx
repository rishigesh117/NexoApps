import React from 'react';
import Link from 'next/link';
import { Download, Star, Sparkles, Check, ArrowRight } from 'lucide-react';
import { MarketplaceItem } from '../../../shared/types';

interface MarketplaceItemCardProps {
  item: MarketplaceItem;
}

export const MarketplaceItemCard: React.FC<MarketplaceItemCardProps> = ({ item }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
            {item.itemType}
          </span>
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" /> {(item.ratingAvg ?? 5.0).toFixed(1)}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">{item.title}</h3>
        <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-2">{item.shortDescription}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-400">
          {item.pricingModel === 'free' ? 'FREE' : `$${item.priceUsd}`}
        </span>
        <span className="text-[11px] text-text-muted font-mono flex items-center gap-1">
          <Download className="w-3.5 h-3.5 text-brand-cyan" /> {item.downloadCount}
        </span>
      </div>
    </div>
  );
};
