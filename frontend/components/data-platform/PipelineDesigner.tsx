import React, { useState, useEffect } from 'react';
import { GitFork, Plus, Play } from 'lucide-react';
import { pipelineService } from '../../services/pipelineService';
import { DataPipeline } from '../../../shared/types';

export const PipelineDesigner: React.FC = () => {
  const [pipelines, setPipelines] = useState<DataPipeline[]>([]);

  useEffect(() => {
    pipelineService.getPipelines().then((data: any) => setPipelines(data || []));
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">ETL / ELT Data Pipeline Designer</h2>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Data Pipeline
        </button>
      </div>

      <div className="space-y-4 max-w-4xl">
        {pipelines.map((p: any) => (
          <div key={p.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <GitFork className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-white">{p.name || p.pipelineName}</h3>
                <p className="text-xs text-slate-400 font-mono">ID: {p.id}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{p.status || 'active'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
