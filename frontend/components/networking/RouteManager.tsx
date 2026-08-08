import React, { useEffect, useState } from 'react';
import { GitBranch, ArrowRight, CheckCircle2 } from 'lucide-react';
import { routingService } from '../../services/routingService';
import { GatewayRoute } from '../../../shared/types';

export const RouteManager: React.FC = () => {
  const [routes, setRoutes] = useState<GatewayRoute[]>([]);

  useEffect(() => {
    routingService.getRoutes().then((res) => setRoutes(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-brand-cyan" /> API Reverse Proxy Route Table
        </h2>
        <span className="text-xs text-text-muted">{routes.length} active routes</span>
      </div>

      <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
        {routes.map((rt) => (
          <div key={rt.id} className="p-4 rounded-lg bg-black/20 border border-white/10 flex items-center justify-between text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-brand-cyan font-bold">{rt.routePath}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">{rt.methods}</span>
              </div>
              <div className="text-[11px] text-text-muted">Target Upstream: <span className="text-purple-400 font-mono">{rt.upstreamId}</span></div>
            </div>
            <span className="text-emerald-400 font-bold uppercase text-[10px]">{rt.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
