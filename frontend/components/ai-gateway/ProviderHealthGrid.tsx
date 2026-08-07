import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, AlertCircle, RefreshCw, Zap, Server } from 'lucide-react';
import { gatewayService } from '../../services/gatewayService';

export const ProviderHealthGrid: React.FC = () => {
  const [healthItems, setHealthItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await gatewayService.getProviderHealthGrid();
      if (res.success) {
        setHealthItems(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch provider health grid', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-cyan" />
            AI Provider Health Probes & Latency Grid
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Real-time ping latency probes, availability status, and circuit breaker telemetry across global AI backends.
          </p>
        </div>
        <button
          onClick={fetchHealth}
          className="px-4 py-2 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-cyan/40 text-text-secondary hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Ping All Probes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthItems.map((h) => {
          const isHealthy = h.status === 'healthy';
          return (
            <div key={h.id} className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono">{h.providerId}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  isHealthy ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  <Activity className="w-3 h-3" />
                  {h.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Latency Probe</span>
                  <span className="font-bold text-brand-cyan font-mono">{h.latencyMs} ms</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Error Rate</span>
                  <span className="font-bold text-emerald-400 font-mono">{(h.errorRate * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-[10px] text-text-muted flex items-center justify-between font-mono">
                <span>Last Probe:</span>
                <span>{new Date(h.lastCheckedAt).toLocaleTimeString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
