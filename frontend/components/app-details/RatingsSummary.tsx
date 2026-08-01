import React from 'react';
import { Star } from 'lucide-react';
import { AppItem } from '../../types';

interface RatingsSummaryProps {
  app: AppItem;
}

export const RatingsSummary: React.FC<RatingsSummaryProps> = ({ app }) => {
  const distribution = [
    { stars: 5, percentage: 88 },
    { stars: 4, percentage: 8 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Ratings & Reviews Summary
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        
        {/* Left Big Score */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-100/80 border border-white/10 text-center space-y-1.5">
          <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">{app.rating}</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(app.rating) ? 'text-amber-400 fill-amber-400' : 'text-surface-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-text-muted">{app.totalReviews} verified ratings</span>
        </div>

        {/* Right Star Bars */}
        <div className="sm:col-span-2 space-y-2">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              <span className="w-8 font-bold text-white text-right">{item.stars}★</span>
              <div className="flex-1 h-2.5 rounded-full bg-surface-200 overflow-hidden border border-white/5">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-10 text-text-muted text-right font-mono">{item.percentage}%</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
