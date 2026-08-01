import React from 'react';
import { Search, Sparkles, Layers, User, History, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SearchAutocompleteProps {
  query: string;
  suggestions: {
    appNames: string[];
    categories: string[];
    developers: string[];
    recentSearches: string[];
    popularSearches: string[];
  };
  onSelectSuggestion: (term: string) => void;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  query,
  suggestions,
  onSelectSuggestion,
}) => {
  const hasResults =
    suggestions.appNames.length > 0 ||
    suggestions.categories.length > 0 ||
    suggestions.developers.length > 0;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 glass-panel p-4 rounded-2xl border border-white/15 shadow-2xl z-50 text-left space-y-4 max-h-[420px] overflow-y-auto backdrop-blur-xl">
      
      {/* 1. App Names Matches */}
      {suggestions.appNames.length > 0 && (
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan flex items-center gap-1.5 px-2">
            <Sparkles className="w-3 h-3" /> Matching Applications
          </span>
          <div className="space-y-0.5">
            {suggestions.appNames.slice(0, 4).map((name, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSuggestion(name)}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white hover:bg-brand-cyan/10 hover:text-brand-cyan transition-colors flex items-center justify-between group"
              >
                <span>{name}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Categories Matches */}
      {suggestions.categories.length > 0 && (
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5 px-2">
            <Layers className="w-3 h-3" /> Categories
          </span>
          <div className="flex flex-wrap gap-1.5 px-2 pt-1">
            {suggestions.categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSuggestion(cat)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-100 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Recent / Popular Searches (when query is short or empty) */}
      {!query && (
        <>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 px-2">
              <History className="w-3 h-3 text-brand-cyan" /> Recent Searches
            </span>
            <div className="flex flex-wrap gap-1.5 px-2 pt-1">
              {suggestions.recentSearches.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectSuggestion(term)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-100 hover:bg-surface-200 text-text-secondary hover:text-white border border-white/5 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 px-2">
              <TrendingUp className="w-3 h-3 text-amber-400" /> Popular Searches
            </span>
            <div className="flex flex-wrap gap-1.5 px-2 pt-1">
              {suggestions.popularSearches.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectSuggestion(term)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-100 hover:bg-amber-500/10 text-amber-300 border border-amber-500/20 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
};
