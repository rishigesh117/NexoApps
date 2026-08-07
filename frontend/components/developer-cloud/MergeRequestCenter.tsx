import React, { useState, useEffect } from 'react';
import { GitPullRequest } from 'lucide-react';
import { repositoryService } from '../../services/repositoryService';
import { MergeRequest } from '../../../shared/types';

export const MergeRequestCenter: React.FC = () => {
  const [mrs, setMrs] = useState<MergeRequest[]>([]);

  useEffect(() => {
    repositoryService.getMergeRequests().then(setMrs);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Merge Requests & Code Reviews</h2>
      <div className="space-y-4 max-w-4xl">
        {mrs.map(m => (
          <div key={m.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-indigo-400" /> #{m.mrNumber}: {m.title}
              </h3>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded font-bold uppercase">{m.status}</span>
            </div>
            <p className="text-xs font-mono text-slate-400">{m.sourceBranch} → {m.targetBranch}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
