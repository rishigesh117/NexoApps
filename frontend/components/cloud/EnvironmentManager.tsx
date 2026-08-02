import React from 'react';
import { Sliders, Plus } from 'lucide-react';

export const EnvironmentManager: React.FC = () => {
  const profiles = [
    { name: 'Production Profile', type: 'production', vars: 12, isDefault: true },
    { name: 'Staging Profile', type: 'staging', vars: 8, isDefault: false },
    { name: 'Development Profile', type: 'development', vars: 5, isDefault: false },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Environment Profiles</h3>
          <p className="text-xs text-text-muted">Isolated environment variables for Production, Staging, and Development</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
          <Plus className="w-3.5 h-3.5" /> New Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {profiles.map((p) => (
          <div key={p.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white">{p.name}</h4>
              {p.isDefault && <span className="px-2 py-0.5 rounded-md bg-brand-cyan/20 text-brand-cyan text-[10px] font-bold">Default</span>}
            </div>
            <p className="text-xs text-text-muted">{p.vars} Configured Variables</p>
          </div>
        ))}
      </div>
    </div>
  );
};
