import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';
import { cloudRegionService } from '../../services/cloudRegionService';
import { RegionHealth } from '../../../shared/types';

export const RegionHealthDashboard: React.FC = () => {
  const [health, setHealth] = useState<RegionHealth[]>([]);

  useEffect(() => {
    cloudRegionService.getHealth().then((res) => setHealth(res));
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Regional Health & Latency Telemetry</h3>
      <div className="space-y-3">
        {health.map((h) => (
          <div key={h.id} className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">Region ID: {h.regionId}</span>
            </div>
            <div className="flex items-center gap-4 text-text-muted">
              <span>Error Rate: <strong className="text-white font-mono">{h.errorRatePct}%</strong></span>
              <span>p95 Latency: <strong className="text-brand-cyan font-mono">{h.latencyP95Ms}ms</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
