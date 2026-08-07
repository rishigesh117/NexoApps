import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';
import { pipelineService } from '../../services/pipelineService';
import { PipelineRun } from '../../../shared/types';

export const PipelineMonitor: React.FC = () => {
  const [runs, setRuns] = useState<PipelineRun[]>([]);

  useEffect(() => {
    pipelineService.getRuns().then(setRuns);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Real-Time CI/CD Pipeline Execution Monitor</h2>
      <div className="space-y-4 max-w-4xl">
        {runs.map(r => (
          <div key={r.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-white">Pipeline Run #{r.runNumber}</h3>
                <p className="text-xs text-slate-400 font-mono">Started: {r.startedAt}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
