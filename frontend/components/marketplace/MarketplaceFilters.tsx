import React from 'react';

interface MarketplaceFiltersProps {
  selectedCategory: string;
  onCategorySelect: (cat: string) => void;
  selectedPricing: string;
  onPricingSelect: (pricing: string) => void;
}

export const MarketplaceFilters: React.FC<MarketplaceFiltersProps> = ({
  selectedCategory,
  onCategorySelect,
  selectedPricing,
  onPricingSelect
}) => {
  const categories = ['All', 'DevOps & Cloud', 'Data & RAG', 'Security', 'General'];
  const pricingModels = ['All', 'free', 'freemium', 'paid', 'subscription'];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface-100/50 border border-white/10">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategorySelect(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-brand-cyan text-slate-950 shadow-glow-cyan'
                : 'bg-surface-200 border border-white/10 text-text-secondary hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase font-bold text-text-muted">Pricing:</span>
        {pricingModels.map((p) => (
          <button
            key={p}
            onClick={() => onPricingSelect(p)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
              selectedPricing === p
                ? 'bg-brand-violet text-white font-bold'
                : 'bg-surface-200/50 text-text-muted hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};
