import React, { useState } from 'react';
import { Search, Sparkles, X, Flame } from 'lucide-react';

interface GlobalSearchProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  popularSearches?: string[];
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  initialQuery = '',
  onSearch,
  popularSearches = ['Batlytics', 'Cricket Scoring', 'AI Utilities', 'Sports Analytics'],
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="w-full space-y-3">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-brand-cyan absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search applications, developers, categories, collections, and AI tools..."
            className="w-full pl-12 pr-24 py-4 rounded-full bg-white/5 border border-white/15 text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan/60 focus:ring-1 focus:ring-brand-cyan/60 text-sm transition-all shadow-2xl"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-24 p-1 rounded-full text-text-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2.5 px-5 py-2.5 rounded-full text-xs font-extrabold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Popular Trending Tags */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="text-text-muted text-[11px] font-semibold flex items-center gap-1">
          <Flame className="w-3 h-3 text-rose-500" /> Popular:
        </span>
        {popularSearches.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => {
              setQuery(term);
              onSearch(term);
            }}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-brand-cyan/40 text-text-secondary hover:text-white text-[11px] transition-all"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};
