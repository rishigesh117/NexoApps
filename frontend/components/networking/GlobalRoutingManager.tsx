import React, { useEffect, useState } from 'react';
import { Radio, ArrowRight } from 'lucide-react';
import { edgeService } from '../../services/edgeService';
import { GlobalRoute } from '../../../shared/types';

export const GlobalRoutingManager: React.FC = () => {
  const [routes, setRoutes] = useState<GlobalRoute[]>([]);

  useEffect(() => {
    edgeService.getGlobalRoutes().then((res) => setRoutes(res));
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Global Traffic Routing Rules</h3>
      <div className="space-y-3">
        {routes.map((r) => (
          <div key={r.id} className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 flex items-center justify-between text-xs">
            <div>
              <span className="font-mono text-brand-cyan font-bold">{r.domainName}</span>
              <div className="text-text-muted text-[11px]">Strategy: {r.routingStrategy}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/10 px-2 py-0.5 rounded text-white">{r.primaryRegion}</span>
              <ArrowRight className="w-4 h-4 text-text-muted" />
              <span className="bg-white/10 px-2 py-0.5 rounded text-purple-300">{r.fallbackRegion}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
