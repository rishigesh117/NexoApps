import React from 'react';
import { Search, Filter, ShieldCheck, ArrowUpDown } from 'lucide-react';
import { ReviewSortOption } from '../../types';

interface ReviewFiltersProps {
  sort: ReviewSortOption;
  onSortChange: (sort: ReviewSortOption) => void;
  selectedStar: number | null;
  onStarChange: (star: number | null) => void;
  verifiedOnly: boolean;
  onVerifiedChange: (verified: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  sort,
  onSortChange,
  selectedStar,
  onStarChange,
  verifiedOnly,
  onVerifiedChange,
  searchQuery,
  onSearchChange,
}) => {
  const sortOptions: { id: ReviewSortOption; label: string }[] = [
    { id: 'newest', label: 'Newest First' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'highest', label: 'Highest Rated' },
    { id: 'helpful', label: 'Most Helpful' },
  ];

  const stars = [null, 5, 4, 3, 2, 1];

  return (
    <div className="glass-card p-4 sm:p-5 rounded-3xl border border-white/10 space-y-4">
      
      {/* Top Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search reviews..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan/50 transition-all"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <ArrowUpDown className="w-4 h-4 text-brand-cyan shrink-0" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as ReviewSortOption)}
            aria-label="Sort reviews"
            className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan/50 transition-all cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Star Filter Pills & Verified Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
        
        {/* Star Rating Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-text-muted mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-brand-cyan" /> Filter:
          </span>
          {stars.map((star) => {
            const isSelected = selectedStar === star;
            return (
              <button
                key={star ?? 'all'}
                onClick={() => onStarChange(star)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-glow-amber'
                    : 'bg-white/5 text-text-secondary hover:text-white border border-white/10'
                }`}
              >
                {star === null ? 'All Ratings' : `${star} ★`}
              </button>
            );
          })}
        </div>

        {/* Verified Only Toggle */}
        <label className="flex items-center gap-2 text-xs text-text-secondary hover:text-white cursor-pointer select-none">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => onVerifiedChange(e.target.checked)}
            className="w-4 h-4 rounded bg-white/5 border-white/20 text-brand-cyan focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verified Users Only</span>
        </label>
      </div>
    </div>
  );
};
