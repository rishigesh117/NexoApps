import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import { modelRegistryService } from '../../services/modelRegistryService';
import { ModelRegistry as ModelRegistryType } from '../../../shared/types';

export const ModelRegistry: React.FC = () => {
  const [models, setModels] = useState<ModelRegistryType[]>([]);

  useEffect(() => {
    modelRegistryService.getModels().then(setModels);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Centralized Enterprise Model Registry & Version Stage Control</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map(m => (
          <div key={m.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" /> {m.modelName}
              </h3>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">Active</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Task: {m.taskType} | Framework: {m.framework}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
