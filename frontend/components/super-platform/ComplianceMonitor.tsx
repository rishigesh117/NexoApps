import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ComplianceMonitor: React.FC = () => {
  const frameworks = [
    { name: 'SOC2 Type II Audit Compliance', status: 'Compliant' },
    { name: 'ISO27001 Information Security Standard', status: 'Compliant' },
    { name: 'HIPAA Healthcare Data Privacy', status: 'Compliant' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Enterprise Compliance Audit Monitor</h3>
      <div className="space-y-3">
        {frameworks.map((f) => (
          <div key={f.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">{f.name}</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
