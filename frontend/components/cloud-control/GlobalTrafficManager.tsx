import React, { useEffect, useState } from 'react';
import { Radio, ArrowRight } from 'lucide-react';
import { globalTrafficService } from '../../services/globalTrafficService';
import { GlobalTrafficRule } from '../../../shared/types';

export const GlobalTrafficManager: React.FC = () => {
  const [rules, setRules] = useState<GlobalTrafficRule[]>([]);

  useEffect(() => {
    globalTrafficService.getRules().then((res) => setRules(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-brand-cyan" /> Global Traffic Orchestration & Routing Rules
        </h2>
      </div>

      <div className="space-y-3">
        {rules.map((r) => (
          <div key={r.id} className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 flex items-center justify-between text-xs">
            <div>
              <span className="font-mono text-brand-cyan font-bold">{r.ruleName}</span>
              <div className="text-text-muted text-[11px]">Mode: {r.routingMode}</div>
            </div>
            <span className="text-emerald-400 font-bold uppercase text-[10px]">{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
