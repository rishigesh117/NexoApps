import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const GovernanceCenter: React.FC = () => {
  const policies = [
    { name: 'OWASP Security Headers & Input Sanitization', category: 'Security', level: 'Strict', status: 'enforced' },
    { name: 'Zero Data Loss Vector Embedding Backup Policy', category: 'Compliance', level: 'Strict', status: 'enforced' },
    { name: 'Autonomous Agent Privilege Boundary', category: 'Permissions', level: 'Strict', status: 'enforced' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Enterprise AI Governance & Policy Center</h3>
      <div className="space-y-3">
        {policies.map((p) => (
          <div key={p.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <h4 className="text-xs font-bold text-white">{p.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Category: {p.category} • Level: {p.level}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold capitalize">
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
