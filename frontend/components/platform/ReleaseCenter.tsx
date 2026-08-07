import React, { useState, useEffect } from 'react';
import { Rocket, CheckCircle2 } from 'lucide-react';
import { releaseService } from '../../services/releaseService';
import { ReleaseHistory } from '../../../shared/types';

export const ReleaseCenter: React.FC = () => {
  const [releases, setReleases] = useState<ReleaseHistory[]>([]);

  useEffect(() => {
    releaseService.getReleases().then(setReleases);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Release Engineering & Version History</h2>
      <div className="space-y-4 max-w-4xl">
        {releases.map(r => (
          <div key={r.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <Rocket className="w-5 h-5 text-purple-400" /> {r.releaseName}
              </h3>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded font-bold">v{r.releaseVersion} LTS</span>
            </div>
            <p className="text-sm text-slate-300 mb-2">{r.notes}</p>
            <span className="text-xs text-slate-400 font-mono">Deployed: {r.deployedAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
