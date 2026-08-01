import React from 'react';
import { Star } from 'lucide-react';
import { RatingDistributionData } from '../../types';

interface RatingDistributionProps {
  stats: RatingDistributionData;
  onFilterByStar?: (star: number | null) => void;
  selectedStar?: number | null;
}

export const RatingDistribution: React.FC<RatingDistributionProps> = ({
  stats,
  onFilterByStar,
  selectedStar,
}) => {
  const { average = 0, total = 0, distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } } = stats;

  const stars = [5, 4, 3, 2, 1];

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-6 sm:gap-10">
      
      {/* Left Score Summary Box */}
      <div className="flex flex-col items-center justify-center text-center shrink-0 w-full md:w-44 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 tracking-tight">
          {average > 0 ? average.toFixed(1) : '0.0'}
        </span>

        {/* 5-Star Visual Row */}
        <div className="flex items-center gap-1 my-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-4 h-4 ${
                s <= Math.round(average)
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-white/20 fill-white/5'
              }`}
            />
          ))}
        </div>

        <span className="text-xs text-text-secondary font-medium">
          {total.toLocaleString()} {total === 1 ? 'rating' : 'ratings'}
        </span>
      </div>

      {/* Right 5-Star Breakdown Progress Bars */}
      <div className="flex-1 w-full space-y-2">
        {stars.map((star) => {
          const count = distribution[star as keyof typeof distribution] || 0;
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
          const isSelected = selectedStar === star;

          return (
            <button
              key={star}
              onClick={() => onFilterByStar?.(isSelected ? null : star)}
              className={`w-full flex items-center gap-3 text-xs group transition-all p-1 rounded-lg ${
                isSelected ? 'bg-white/10 border border-brand-cyan/30' : 'hover:bg-white/5'
              }`}
              aria-label={`Filter reviews by ${star} stars`}
            >
              <div className="flex items-center gap-1 w-12 font-medium text-text-secondary group-hover:text-white shrink-0">
                <span>{star}</span>
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              </div>

              {/* Progress bar container */}
              <div className="flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="w-12 text-right text-text-muted group-hover:text-text-secondary font-mono text-[11px]">
                {percentage}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
