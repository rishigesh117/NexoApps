import React, { useState } from 'react';
import { Filter, SlidersHorizontal, Layers, Smartphone, Star, ArrowUpDown, X, RotateCcw } from 'lucide-react';

interface StoreSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
  minRating: number;
  onSelectMinRating: (rating: number) => void;
  onResetAll: () => void;
}

export const CATEGORIES_LIST = [
  'All',
  'Android Apps',
  'AI Apps',
  'College Projects',
  'Utilities',
  'Education',
  'Sports',
  'Games',
  'Business',
  'Productivity',
  'Future Apps',
];

export const PLATFORMS_LIST = [
  'All',
  'Android',
  'Windows',
  'Web',
  'Linux',
  'macOS',
  'Cross-Platform',
];

export const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest Releases' },
  { id: 'most_downloaded', label: 'Most Downloaded' },
  { id: 'highest_rated', label: 'Highest Rated' },
  { id: 'recently_updated', label: 'Recently Updated' },
  { id: 'az', label: 'Alphabetical A-Z' },
  { id: 'za', label: 'Alphabetical Z-A' },
  { id: 'oldest', label: 'Oldest First' },
];

export const StoreSidebar: React.FC<StoreSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform,
  sortBy,
  onSelectSortBy,
  minRating,
  onSelectMinRating,
  onResetAll,
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const FilterContent = (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-cyan" /> Filter & Sort
        </h3>
        <button
          onClick={onResetAll}
          className="text-[11px] text-text-muted hover:text-brand-cyan transition-colors flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* 1. Sort Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-brand-cyan" /> Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSelectSortBy(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-cyan transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Categories List */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-cyan" /> Categories
        </label>
        <div className="space-y-1 max-h-56 overflow-y-auto scrollbar-none pr-1">
          {CATEGORIES_LIST.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 font-bold'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Platform Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-brand-cyan" /> Platform
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PLATFORMS_LIST.map((plat) => {
            const isActive = selectedPlatform === plat;
            return (
              <button
                key={plat}
                onClick={() => onSelectPlatform(plat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-slate-950 shadow-glow-cyan'
                    : 'bg-surface-100 text-text-muted hover:text-white border border-white/5'
                }`}
              >
                {plat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Minimum Rating Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Minimum Rating
        </label>
        <div className="flex items-center gap-1.5">
          {[0, 4, 4.5, 5].map((rating) => {
            const isActive = minRating === rating;
            return (
              <button
                key={rating}
                onClick={() => onSelectMinRating(rating)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-surface-100 text-text-muted hover:text-white border border-white/5'
                }`}
              >
                {rating === 0 ? 'Any' : `${rating}★`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Left Glass Panel */}
      <div className="hidden lg:block w-64 shrink-0 glass-panel p-5 rounded-3xl border border-white/10 h-fit sticky top-24">
        {FilterContent}
      </div>

      {/* Mobile Trigger Button */}
      <div className="lg:hidden w-full mb-4">
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="w-full py-3 px-4 rounded-2xl glass-panel border border-white/10 text-white text-xs font-bold flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-brand-cyan" /> Filters & Categories
          </span>
          <span className="text-[10px] bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded-full border border-brand-cyan/30">
            {selectedCategory}
          </span>
        </button>
      </div>

      {/* Mobile Bottom Sheet Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel rounded-t-3xl border-t border-white/20 p-6 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Store Filters</h3>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2 rounded-xl bg-surface-200 text-text-muted hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {FilterContent}
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="w-full py-3 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs shadow-glow-cyan mt-4"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};
