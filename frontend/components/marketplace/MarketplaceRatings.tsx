import React from 'react';
import { Star } from 'lucide-react';

export const MarketplaceRatings: React.FC = () => {
  return (
    <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className="w-4 h-4 fill-amber-400" />
      ))}
      <span className="text-white ml-2">4.9 / 5.0 Average</span>
    </div>
  );
};
