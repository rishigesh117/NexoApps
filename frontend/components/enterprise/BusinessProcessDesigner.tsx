import React from 'react';
import { Layers, Play, CheckCircle2 } from 'lucide-react';

export const BusinessProcessDesigner: React.FC = () => {
  const processes = [
    { name: 'Automated Software Deployment & Code Review', desc: 'Triggers autonomous CI/CD, security scan, and PR approval', status: 'active' },
    { name: 'Enterprise Invoice Reconciliation & Audit', desc: 'Extracts line items, validates tax rules, and posts to ledger', status: 'active' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Business Process Designer & Workflows</h3>
      <div className="space-y-3">
        {processes.map((p) => (
          <div key={p.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-violet-400" />
              <div>
                <h4 className="text-xs font-bold text-white">{p.name}</h4>
                <p className="text-[10px] text-text-muted mt-0.5">{p.desc}</p>
              </div>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-cyan/20 text-brand-cyan text-xs font-bold hover:bg-brand-cyan/30 transition-colors">
              <Play className="w-3.5 h-3.5" /> Trigger
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
