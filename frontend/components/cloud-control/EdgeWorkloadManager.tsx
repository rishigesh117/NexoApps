import React, { useEffect, useState } from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import { edgeWorkloadService } from '../../services/edgeWorkloadService';
import { EdgeWorkload, EdgeDeployment } from '../../../shared/types';

export const EdgeWorkloadManager: React.FC = () => {
  const [workloads, setWorkloads] = useState<EdgeWorkload[]>([]);
  const [deployments, setDeployments] = useState<EdgeDeployment[]>([]);

  useEffect(() => {
    Promise.all([
      edgeWorkloadService.getWorkloads(),
      edgeWorkloadService.getDeployments(),
    ]).then(([w, d]) => {
      setWorkloads(w);
      setDeployments(d);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-cyan" /> Intelligent Edge Workload Management
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workloads.map((w) => (
          <div key={w.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                Scope: {w.targetScope}
              </span>
              <span className="text-xs text-emerald-400 font-bold uppercase">{w.status}</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{w.workloadName}</h3>
            <div className="text-xs text-text-muted font-mono pt-2 border-t border-white/10">
              Image: <strong className="text-white">{w.containerImage}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
