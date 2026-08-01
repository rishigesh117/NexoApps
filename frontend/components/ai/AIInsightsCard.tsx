import React from 'react';
import { Sparkles, TrendingUp, Lightbulb } from 'lucide-react';

export const AIInsightsCard: React.FC = () => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-brand-cyan/30 bg-gradient-to-r from-brand-cyan/10 via-brand-blue/10 to-brand-violet/10 space-y-4 shadow-2xl text-left">
      <div className="flex items-center gap-2 text-brand-cyan font-bold text-xs uppercase tracking-wider">
        <Sparkles className="w-4 h-4" /> AI Platform Insight & Recommendation
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-black text-white">
          Cricket Scoring & Sports Analytics demand grew +34% this week.
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed max-w-3xl">
          Automated analysis shows high conversion rates for Batlytics Cricket Scoring. Expanding PDF match report features and live commentary Bluetooth sync could boost active user retention by an estimated 18.5%.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2 text-xs">
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> High Retention Opportunity
        </span>
        <span className="text-text-muted">Calculated by NexoApps AI Intelligence Engine</span>
      </div>
    </div>
  );
};
