import React from 'react';
import { RecommendationItem } from '../../types';
import { AppRecommendationCard } from './AppRecommendationCard';
import { Sparkles } from 'lucide-react';

interface Props {
  recommendations: RecommendationItem[];
}

export const RecommendationGrid: React.FC<Props> = ({ recommendations }) => {
  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-cyan" /> Personalized Recommendations for You
        </h3>
        <span className="text-xs text-text-muted">AI Matching Engine</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((item, idx) => (
          <AppRecommendationCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};
