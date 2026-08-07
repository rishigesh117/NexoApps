import React, { useState, useEffect } from 'react';
import { Boxes, CheckCircle2 } from 'lucide-react';
import { platformOsService } from '../../services/platformOsService';

export const ModuleExplorer: React.FC = () => {
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    fetchMods();
  }, []);

  const fetchMods = async () => {
    try {
      const res = await platformOsService.listModules();
      if (res.success) setModules(res.data);
    } catch (err) {
      console.error('Failed to load modules', err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Boxes className="w-5 h-5 text-brand-violet" />
        AI OS Integrated Subsystem Explorer
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m) => (
          <div key={m.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-mono text-brand-cyan">v{m.version}</span>
              <h4 className="font-bold text-white mt-0.5">{m.displayName}</h4>
              <p className="text-text-muted mt-0.5">{m.routePath}</p>
            </div>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Enabled
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
