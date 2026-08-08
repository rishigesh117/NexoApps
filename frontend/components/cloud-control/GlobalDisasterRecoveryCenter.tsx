import React, { useEffect, useState } from 'react';
import { Shield, Play, CheckCircle2 } from 'lucide-react';
import { disasterRecoveryService } from '../../services/disasterRecoveryService';
import { DisasterRecoveryPlan, DisasterRecoveryExecution } from '../../../shared/types';

export const GlobalDisasterRecoveryCenter: React.FC = () => {
  const [plans, setPlans] = useState<DisasterRecoveryPlan[]>([]);
  const [executions, setExecutions] = useState<DisasterRecoveryExecution[]>([]);

  useEffect(() => {
    Promise.all([
      disasterRecoveryService.getPlans(),
      disasterRecoveryService.getExecutions(),
    ]).then(([p, e]) => {
      setPlans(p);
      setExecutions(e);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-rose-400" /> Global Disaster Recovery Orchestration
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((p) => (
          <div key={p.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Status: {p.status}
              </span>
              <span className="text-xs text-brand-cyan font-mono">RPO: {p.rpoSeconds}s | RTO: {p.rtoMinutes}m</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{p.planName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
