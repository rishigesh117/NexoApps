import React, { useEffect, useState } from 'react';
import { Terminal, CheckCircle2 } from 'lucide-react';
import { infrastructureService } from '../../services/infrastructureService';
import { InfrastructureStack } from '../../../shared/types';

export const InfrastructureStackManager: React.FC = () => {
  const [stacks, setStacks] = useState<InfrastructureStack[]>([]);

  useEffect(() => {
    infrastructureService.getStacks().then((res) => setStacks(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-brand-cyan" /> Infrastructure Stacks & IaC Automation
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stacks.map((s) => (
          <div key={s.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                Type: {s.templateType}
              </span>
              <span className="text-xs text-emerald-400 font-bold uppercase">{s.status}</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{s.stackName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
