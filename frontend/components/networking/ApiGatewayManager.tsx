import React, { useEffect, useState } from 'react';
import { Server, CheckCircle2, Sliders, Layers } from 'lucide-react';
import { gatewayService } from '../../services/gatewayService';
import { ApiGateway } from '../../../shared/types';

export const ApiGatewayManager: React.FC = () => {
  const [gateways, setGateways] = useState<ApiGateway[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gatewayService.getGateways().then((res) => {
      setGateways(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Loading API Gateways...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-brand-cyan" /> Enterprise API Gateway Lifecycle & Control
        </h2>
        <span className="text-xs text-text-muted">{gateways.length} active gateways</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gateways.map((gw) => (
          <div key={gw.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                {gw.mode}
              </span>
              <span className="text-xs text-emerald-400 font-bold uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {gw.status}
              </span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{gw.gatewayName}</h3>
            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-white/10">
              <span>Port: <strong className="text-white">{gw.listenPort}</strong></span>
              <span>Env: <strong className="text-white capitalize">{gw.environment}</strong></span>
              <span>v{gw.version}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
