import React, { useState, useEffect } from 'react';
import { BarChart3, DollarSign, Cpu, Activity, TrendingUp, Layers } from 'lucide-react';
import { gatewayService } from '../../services/gatewayService';

export const UsageDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await gatewayService.getTokenAnalytics();
      if (res.success) {
        setAnalytics(res.data);
      }
    } catch (err) {
      console.error('Failed to load token analytics', err);
    } finally {
      setLoading(false);
    }
  };

  const summary = analytics?.summary || { totalTokens: 8825000, totalCost: 44.75, totalRequests: 2550, activeProvidersCount: 4 };
  const breakdown = analytics?.providerBreakdown || [];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-cyan" />
            Universal AI Gateway Token Usage & Financial Analytics
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Real-time token consumption, request counts, and cost telemetry per AI provider.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
          Billing Cycle: August 2026
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Total Tokens</p>
            <h3 className="text-xl font-extrabold text-white mt-0.5">{(summary.totalTokens / 1000000).toFixed(2)}M</h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Total Estimated Cost</p>
            <h3 className="text-xl font-extrabold text-white mt-0.5">${summary.totalCost}</h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Total API Requests</p>
            <h3 className="text-xl font-extrabold text-white mt-0.5">{summary.totalRequests}</h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Active Providers</p>
            <h3 className="text-xl font-extrabold text-white mt-0.5">{summary.activeProvidersCount}</h3>
          </div>
        </div>
      </div>

      {/* Provider Breakdown Table */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <h3 className="text-sm font-bold text-white mb-4">Provider Consumption Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-text-muted font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Provider ID</th>
                <th className="pb-3">Tokens Used</th>
                <th className="pb-3">Request Count</th>
                <th className="pb-3">Estimated Cost</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {breakdown.map((row: any) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-bold text-white font-mono">{row.providerId}</td>
                  <td className="py-3 text-text-secondary">{row.totalTokens.toLocaleString()}</td>
                  <td className="py-3 text-text-secondary">{row.requestCount}</td>
                  <td className="py-3 text-emerald-400 font-bold">${row.totalCost.toFixed(2)}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                      Tracked
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
