import React, { useState, useEffect } from 'react';
import { Boxes, CheckCircle2 } from 'lucide-react';
import { platformService } from '../../services/platformService';
import { PlatformModule } from '../../../shared/types';

export const ModuleExplorer: React.FC = () => {
  const [modules, setModules] = useState<PlatformModule[]>([]);

  useEffect(() => {
    platformService.getModules().then(setModules);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Platform Module & Dependency Explorer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map(m => (
          <div key={m.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <Boxes className="w-5 h-5 text-cyan-400" /> {m.moduleName}
              </h3>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs uppercase font-semibold">{m.status}</span>
            </div>
            <p className="text-xs font-mono text-slate-400">Key: {m.moduleKey} | Version: v{m.version}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
