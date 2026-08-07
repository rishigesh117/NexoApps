import React, { useState, useEffect } from 'react';
import { GitBranch, ShieldCheck } from 'lucide-react';
import { repositoryService } from '../../services/repositoryService';
import { Branch } from '../../../shared/types';

export const BranchManager: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    repositoryService.getBranches().then(setBranches);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Branch Protection & Policies</h2>
      <div className="space-y-4 max-w-4xl">
        {branches.map(b => (
          <div key={b.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <GitBranch className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-semibold text-white">{b.branchName}</h3>
                <p className="text-xs text-slate-400 font-mono">Head: {b.headCommitHash}</p>
              </div>
            </div>
            {b.isProtected && <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5"/> Protected</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
