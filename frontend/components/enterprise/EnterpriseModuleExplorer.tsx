import React, { useState } from 'react';
import { Boxes, Check, Sparkles } from 'lucide-react';

export const EnterpriseModuleExplorer: React.FC = () => {
  const [modules] = useState([
    { id: 'm1', name: 'AI Operating System Platform', key: 'ai_os', desc: 'Core kernel, agent workspace & execution runtime', version: '9.0.0' },
    { id: 'm2', name: 'AI Collaboration Platform', key: 'collaboration', desc: 'Enterprise channels, meeting center, document hub & whiteboards', version: '9.0.0' },
    { id: 'm3', name: 'AI Developer Cloud & DevOps', key: 'dev_cloud', desc: 'CI/CD build runners, git repos & container registry', version: '9.0.0' },
    { id: 'm4', name: 'AI ModelOps & ML Governance', key: 'modelops', desc: 'Dataset manager, training center & model registry', version: '9.0.0' },
    { id: 'm5', name: 'AI Enterprise Automation Platform', key: 'automation', desc: 'RPA manager, workflow engine & integration hub', version: '9.0.0' }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Boxes className="w-6 h-6 text-brand-cyan" /> Enterprise Module Explorer
        </h2>
        <p className="text-text-muted text-sm">Unified module registry of NexoApps AI Enterprise Universe</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m) => (
          <div key={m.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">{m.name}</h3>
              <span className="px-2.5 py-0.5 bg-brand-cyan/20 text-brand-cyan text-xs font-mono font-semibold rounded-md">v{m.version}</span>
            </div>
            <p className="text-text-muted text-xs">{m.desc}</p>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold pt-2 border-t border-white/10">
              <Check className="w-4 h-4" /> Enabled & Operational
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
