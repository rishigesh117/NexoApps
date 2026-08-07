import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { developerCloudService } from '../../services/developerCloudService';
import { BuildRunner } from '../../../shared/types';

export const BuildRunnerManager: React.FC = () => {
  const [runners, setRunners] = useState<BuildRunner[]>([]);

  useEffect(() => {
    developerCloudService.getRunners().then(setRunners);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Build Runner Fleet Pool Manager</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {runners.map(r => (
          <div key={r.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" /> {r.runnerName}
              </h3>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs uppercase font-semibold">{r.status}</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Type: {r.runnerType} | Max Concurrent: {r.maxJobs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
