import React, { useEffect, useState } from 'react';
import { Radio, CheckCircle2 } from 'lucide-react';
import { networkingService } from '../../services/networkingService';

export const NetworkHealthDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    networkingService.getHealth().then((res) => setData(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-brand-cyan" /> Network Health & Infrastructure Telemetry
        </h2>
        <span className="text-xs text-emerald-400 font-mono font-bold">Health Score: {data?.status?.healthScore}%</span>
      </div>

      <div className="space-y-3">
        {data?.components?.map((c: any) => (
          <div key={c.id} className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">{c.componentName}</span>
            </div>
            <div className="flex items-center gap-4 text-text-muted">
              <span>Packet Loss: <strong className="text-white font-mono">{c.packetLossPct}%</strong></span>
              <span>p95 Latency: <strong className="text-brand-cyan font-mono">{c.latencyP95Ms}ms</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
