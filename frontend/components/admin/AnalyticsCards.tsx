import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface AnalyticsCardsProps {
  analytics: {
    monthlyDownloads: { month: string; count: number }[];
    ratingDistribution: Record<number, number>;
    categoryShare: { category: string; percentage: number }[];
  };
}

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ analytics }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
      
      {/* Monthly Downloads Growth Card */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-cyan" />
            <h3 className="text-base font-bold text-white">Monthly Downloads Growth</h3>
          </div>
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +28% MoM
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {analytics.monthlyDownloads.map((item, idx) => {
            const max = 10000;
            const pct = Math.round((item.count / max) * 100);

            return (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-text-secondary">{item.month}</span>
                  <span className="text-white font-mono">{item.count.toLocaleString()} APK downloads</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Share Distribution Card */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-brand-violet" />
            <h3 className="text-base font-bold text-white">Catalog Category Share</h3>
          </div>
          <span className="text-xs text-text-muted">App Portfolio</span>
        </div>

        <div className="space-y-4 pt-2">
          {analytics.categoryShare.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-white">{item.category}</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-brand-cyan">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
