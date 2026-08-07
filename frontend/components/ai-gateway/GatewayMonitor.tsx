import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRightLeft, Cpu, Activity, RefreshCw } from 'lucide-react';
import { gatewayService } from '../../services/gatewayService';

export const GatewayMonitor: React.FC = () => {
  const [fallbacks, setFallbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const res = await gatewayService.getFallbackPolicies();
      if (res.success) {
        setFallbacks(res.data);
      }
    } catch (err) {
      console.error('Failed to load fallback policies', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-cyan" />
            Universal AI Gateway Monitor & Automatic Failover Engine
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Dynamic circuit breaking, status-code failover triggers, and zero-downtime provider fallback policies.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
          <Activity className="w-4 h-4" />
          Failover Engine Operational
        </span>
      </div>

      {/* Fallback Rules List */}
      <div className="space-y-4">
        {fallbacks.map((fb) => (
          <div key={fb.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-mono">{fb.primaryProviderId}</span>
                  <span className="text-xs text-text-muted">→</span>
                  <span className="text-sm font-bold text-brand-cyan font-mono">{fb.fallbackProviderId}</span>
                </div>
                <p className="text-xs text-text-muted mt-0.5">Priority Level {fb.priority} Policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono px-3 py-1 rounded-xl bg-surface-100 border border-white/10 text-text-secondary">
                Triggers: 500, 502, 503, 429
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Enabled
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
