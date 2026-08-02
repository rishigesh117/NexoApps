import React from 'react';
import { Activity, Radio, Cpu } from 'lucide-react';

export const ObservabilityDashboard: React.FC = () => {
  const traces = [
    { service: 'global-ai-orchestrator', traceId: 'tr_8f910a', latency: '14.2ms', status: 'ok' },
    { service: 'reasoning-engine', traceId: 'tr_8f910b', latency: '38.5ms', status: 'ok' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Platform Observability & Distributed Traces</h3>
      <div className="space-y-3">
        {traces.map((t) => (
          <div key={t.traceId} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-brand-cyan" />
              <div>
                <span className="font-bold text-white">{t.service}</span>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Trace ID: {t.traceId}</p>
              </div>
            </div>
            <span className="font-mono text-brand-cyan">{t.latency}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
