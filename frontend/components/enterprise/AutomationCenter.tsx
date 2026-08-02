import React from 'react';
import { Rocket, CheckCircle2 } from 'lucide-react';

export const AutomationCenter: React.FC = () => {
  const templates = [
    { name: 'Autonomous Software Release & CI/CD Pipeline', category: 'Engineering', status: 'deployed' },
    { name: 'Automated Invoice Reconciliation & Tax Validation', category: 'Finance', status: 'deployed' },
    { name: 'Employee Onboarding & Security Access Provisioning', category: 'HR & Ops', status: 'ready' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Business Process Automation Center</h3>
      <div className="space-y-3">
        {templates.map((t) => (
          <div key={t.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Rocket className="w-4 h-4 text-brand-cyan" />
              <div>
                <h4 className="text-xs font-bold text-white">{t.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Category: {t.category}</p>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
              Deploy Recipe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
