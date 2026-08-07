import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { pipelineService } from '../../services/pipelineService';
import { PipelineDefinition } from '../../../shared/types';

export const PipelineDesigner: React.FC = () => {
  const [pipelines, setPipelines] = useState<PipelineDefinition[]>([]);

  useEffect(() => {
    pipelineService.getPipelines().then(setPipelines);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Visual CI/CD Pipeline Designer</h2>
      <div className="space-y-4 max-w-4xl">
        {pipelines.map(p => (
          <div key={p.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-3">
              <Play className="w-5 h-5 text-cyan-400" /> {p.pipelineName}
            </h3>
            <pre className="p-4 bg-slate-950 rounded text-xs font-mono text-cyan-300 overflow-x-auto">{p.configYaml}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};
