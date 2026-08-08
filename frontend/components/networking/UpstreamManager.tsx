import React, { useEffect, useState } from 'react';
import { Layers, Activity } from 'lucide-react';
import { routingService } from '../../services/routingService';
import { GatewayUpstream } from '../../../shared/types';

export const UpstreamManager: React.FC = () => {
  const [upstreams, setUpstreams] = useState<GatewayUpstream[]>([]);

  useEffect(() => {
    routingService.getUpstreams().then((res) => setUpstreams(res));
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Gateway Upstream Pools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upstreams.map((ups) => (
          <div key={ups.id} className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-purple-400">{ups.algorithm}</span>
              <span className="text-text-muted text-[11px]">Check: {ups.healthCheckPath}</span>
            </div>
            <h4 className="font-bold text-white text-sm">{ups.upstreamName}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
