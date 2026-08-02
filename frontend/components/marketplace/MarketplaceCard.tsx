import React from 'react';
import { MarketplaceItem } from '../../types';
import { Star, Download, ShieldCheck, Tag } from 'lucide-react';
import Link from 'next/link';

interface MarketplaceCardProps {
  item: MarketplaceItem;
}

export const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ item }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all space-y-4 flex flex-col justify-between text-left shadow-2xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
            {item.type}
          </span>
          <span className="text-xs font-black text-emerald-400">
            {item.price > 0 ? `$${item.price.toFixed(2)}` : 'FREE'}
          </span>
        </div>

        <div className="space-y-1">
          <Link href={`/marketplace/item/${item.id}`}>
            <h3 className="font-extrabold text-white text-base leading-tight hover:text-brand-cyan transition-colors">
              {item.title}
            </h3>
          </Link>
          <p className="text-xs text-text-muted">By {item.creatorName || 'Nexo Developer'}</p>
          <p className="text-xs text-text-secondary line-clamp-2 pt-1">{item.shortDescription}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-text-muted">
        <span className="flex items-center gap-1 font-bold text-amber-400">
          <Star className="w-3.5 h-3.5 fill-amber-400" /> {item.ratingAvg.toFixed(1)}
        </span>

        <span className="flex items-center gap-1 font-bold text-white">
          <Download className="w-3.5 h-3.5 text-brand-cyan" /> {item.downloadsCount}
        </span>

        <Link
          href={`/marketplace/item/${item.id}`}
          className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1 transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
