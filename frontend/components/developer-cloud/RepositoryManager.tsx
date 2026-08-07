import React, { useState, useEffect } from 'react';
import { GitBranch, Plus, Lock } from 'lucide-react';
import { repositoryService } from '../../services/repositoryService';
import { Repository } from '../../../shared/types';

export const RepositoryManager: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    repositoryService.getRepositories().then(setRepos);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Enterprise Source Code Repositories</h2>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Repository
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map(r => (
          <div key={r.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-purple-400" /> {r.repoName}
              </h3>
              {r.isPrivate && <span className="px-2.5 py-1 bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1"><Lock className="w-3 h-3"/> Private</span>}
            </div>
            <p className="text-xs text-slate-400 font-mono">Default Branch: {r.defaultBranch}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
