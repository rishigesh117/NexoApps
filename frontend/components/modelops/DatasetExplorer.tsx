import React from 'react';
import { Database } from 'lucide-react';

export const DatasetExplorer: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Dataset Schema & Snapshot Explorer</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-3xl">
        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" /> Customer Intent Dataset (v2.1)
        </h3>
        <p className="text-xs text-slate-400 font-mono">500,000 Annotated Samples | Text Classification | Parquet Format</p>
      </div>
    </div>
  );
};
