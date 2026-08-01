import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface SearchFiltersProps {
  category: string;
  sort: string;
  rating: string;
  onCategoryChange: (cat: string) => void;
  onSortChange: (sort: string) => void;
  onRatingChange: (rating: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  category,
  sort,
  rating,
  onCategoryChange,
  onSortChange,
  onRatingChange,
}) => {
  const categories = ['All', 'Android Apps', 'AI Utilities', 'Sports', 'Productivity', 'Developer Tools'];
  const sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Most Downloaded', value: 'downloads' },
    { label: 'Latest Update', value: 'latest' },
  ];

  return (
    <div className="glass-panel p-4 rounded-3xl border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Filter className="w-4 h-4 text-brand-cyan shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              category === cat
                ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-glow-cyan'
                : 'bg-white/5 text-text-muted hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-text-muted">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Sort By:</span>
        </div>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white/5 border border-white/10 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-brand-cyan"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
