import React from 'react';
import { Search } from 'lucide-react';

interface MarketplaceSearchProps {
  query: string;
  onQueryChange: (q: string) => void;
}

export const MarketplaceSearch: React.FC<MarketplaceSearchProps> = ({ query, onQueryChange }) => {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="w-5 h-5 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search agents, plugins, workflows, datasets, templates..."
        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-surface-100/90 border border-white/10 text-white text-xs placeholder:text-text-muted focus:border-brand-cyan focus:outline-none transition-all shadow-glass"
      />
    </div>
  );
};
