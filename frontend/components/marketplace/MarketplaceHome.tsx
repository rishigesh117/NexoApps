import React from 'react';
import { Sparkles, Store, Layers, Boxes, Bot, Database, Globe } from 'lucide-react';
import { RecommendationCarousel } from './RecommendationCarousel';
import { MarketplaceCollections } from './MarketplaceCollections';
import { MarketplaceExplorer } from './MarketplaceExplorer';

export const MarketplaceHome: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> NexoApps Version 6.2 Marketplace Release
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">
          AI Marketplace & <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">Extension Platform</span>
        </h1>
        <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
          Discover, install, monetize, and manage enterprise AI agents, visual workflows, vector RAG plugins, and SDK packages.
        </p>
      </div>

      <RecommendationCarousel />
      <MarketplaceCollections />
      <MarketplaceExplorer />
    </div>
  );
};
