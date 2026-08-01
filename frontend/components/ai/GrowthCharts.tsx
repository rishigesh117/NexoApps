import React from 'react';
import { EnterpriseAnalyticsOverview } from '../../types';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface GrowthChartsProps {
  data: EnterpriseAnalyticsOverview;
}

export const GrowthCharts: React.FC<GrowthChartsProps> = ({ data }) => {
  const maxDownloads = Math.max(...data.dailyMetrics.map((d) => d.downloads), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
      {/* 1. Daily Downloads Growth Chart */}
      <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-cyan" />
            <div>
              <h3 className="text-base font-bold text-white">Daily Downloads Growth Trend</h3>
              <p className="text-xs text-text-muted">Real-time daily activity traffic volume</p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-extrabold">+18.4% WoW</span>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-44 flex items-end justify-between gap-3 pt-4">
          {data.dailyMetrics.map((item) => {
            const heightPercent = Math.round((item.downloads / maxDownloads) * 100);
            return (
              <div key={item.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-text-muted">{item.downloads.toLocaleString()}</span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full rounded-2xl bg-gradient-to-t from-brand-blue to-brand-cyan hover:from-brand-cyan hover:to-brand-violet transition-all shadow-glow-cyan"
                />
                <span className="text-xs font-bold text-white">{item.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Device Distribution Chart */}
      <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-brand-violet" />
            <h3 className="text-base font-bold text-white">Device Breakdown</h3>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {data.deviceDistribution.map((item) => (
            <div key={item.device} className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-white">{item.device}</span>
                <span className="text-brand-cyan font-mono">{item.percentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  style={{ width: `${item.percentage}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
