import React from 'react';
import { EnterpriseAnalyticsOverview } from '../../types';
import { Users, Download, Star, Code2, TrendingUp, Sparkles, Activity } from 'lucide-react';

interface AnalyticsOverviewProps {
  data: EnterpriseAnalyticsOverview;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted">
          <span className="text-xs font-semibold uppercase tracking-wider">Active Users (DAU / MAU)</span>
          <Users className="w-4 h-4 text-brand-cyan" />
        </div>
        <h3 className="text-2xl font-black text-white">{data.dau.toLocaleString()} <span className="text-xs text-text-muted font-normal">/ {data.mau.toLocaleString()}</span></h3>
        <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> +14.2% Growth this month
        </p>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted">
          <span className="text-xs font-semibold uppercase tracking-wider">Total Downloads</span>
          <Download className="w-4 h-4 text-brand-violet" />
        </div>
        <h3 className="text-2xl font-black text-white">{data.totalDownloads.toLocaleString()}</h3>
        <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> +22.8% Growth this week
        </p>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted">
          <span className="text-xs font-semibold uppercase tracking-wider">Conversion Rate</span>
          <Activity className="w-4 h-4 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-black text-emerald-400">{data.conversionRate}%</h3>
        <p className="text-[11px] text-text-muted">App View to Download Rate</p>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted">
          <span className="text-xs font-semibold uppercase tracking-wider">Active Developers</span>
          <Code2 className="w-4 h-4 text-amber-400" />
        </div>
        <h3 className="text-2xl font-black text-white">{data.activeDevelopers} Studios</h3>
        <p className="text-[11px] text-brand-cyan font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Verified Partners
        </p>
      </div>
    </div>
  );
};
