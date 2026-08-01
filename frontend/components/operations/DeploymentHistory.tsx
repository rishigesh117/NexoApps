import React from 'react';
import { DeploymentEntry } from '../../types';
import { Rocket, CheckCircle2, GitCommit, Layers } from 'lucide-react';

interface DeploymentHistoryProps {
  deployments: DeploymentEntry[];
}

export const DeploymentHistory: React.FC<DeploymentHistoryProps> = ({ deployments }) => {
  return (
    <div className="space-y-4 text-left">
      {deployments.map((d) => (
        <div key={d.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 transition-all shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
              <Rocket className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-white text-sm">{d.environment} Build ({d.version})</h4>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {d.status}
                </span>
              </div>
              <p className="text-xs text-text-muted flex items-center gap-2">
                <GitCommit className="w-3.5 h-3.5 text-brand-violet" /> Commit Hash: <span className="font-mono text-white font-bold">{d.commitHash}</span> • Deployed by: {d.deployedBy}
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-text-muted shrink-0">
            {new Date(d.deployedAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};
