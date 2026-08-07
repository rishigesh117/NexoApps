import React from 'react';
import { Download, Star, ShieldCheck, Check, Globe } from 'lucide-react';
import { MarketplaceItem } from '../../../shared/types';

interface MarketplaceDetailsProps {
  item: MarketplaceItem;
}

export const MarketplaceDetails: React.FC<MarketplaceDetailsProps> = ({ item }) => {
  return (
    <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
              {item.itemType}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Package
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">{item.title}</h1>
          <p className="text-xs text-text-muted mt-1">Version {item.version} • Published by Nexo Official</p>
        </div>

        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>Install Package ({item.pricingModel === 'free' ? 'FREE' : `$${item.priceUsd}`})</span>
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Package Overview</h3>
        <p className="text-xs text-text-secondary leading-relaxed">{item.fullDescription}</p>
      </div>
    </div>
  );
};
