import React, { useState, useEffect } from 'react';
import { GitCommit, ArrowRight } from 'lucide-react';
import { metadataService } from '../../services/metadataService';
import { DataLineage } from '../../../shared/types';

export const DataLineageViewer: React.FC = () => {
  const [lineage, setLineage] = useState<DataLineage[]>([]);

  useEffect(() => {
    metadataService.getLineage().then(setLineage);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">End-to-End Data Lineage Graph</h2>
      <div className="space-y-4 max-w-3xl">
        {lineage.map(l => (
          <div key={l.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-4 text-sm font-semibold mb-3">
              <span className="px-3 py-1 bg-slate-900 text-cyan-400 font-mono rounded">{l.sourceAssetId}</span>
              <ArrowRight className="w-5 h-5 text-emerald-400" />
              <span className="px-3 py-1 bg-slate-900 text-purple-400 font-mono rounded">{l.targetAssetId}</span>
            </div>
            <p className="text-xs font-mono text-slate-400 bg-slate-900/60 p-3 rounded">{l.transformationLogic}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
