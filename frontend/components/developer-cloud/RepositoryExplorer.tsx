import React from 'react';
import { Code2, FileCode } from 'lucide-react';

export const RepositoryExplorer: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Source Code File Explorer</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 font-mono text-sm max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-cyan-400"><FileCode className="w-4 h-4" /> src/index.ts</div>
        <div className="flex items-center gap-2 text-slate-300 ml-4"><FileCode className="w-4 h-4" /> services/kernel.ts</div>
        <div className="flex items-center gap-2 text-slate-300 ml-4"><FileCode className="w-4 h-4" /> config/pipeline.yml</div>
      </div>
    </div>
  );
};
