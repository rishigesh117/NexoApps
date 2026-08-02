import React from 'react';
import { ShieldCheck, ToggleRight } from 'lucide-react';

export const CapabilityManager: React.FC = () => {
  const capabilities = [
    { name: 'System Architecture Design & Spec Verification', enabled: true },
    { name: 'Automated GitHub Code Review & Lint Resolution', enabled: true },
    { name: 'Kubernetes Container Deployment & Rolling Updates', enabled: true },
    { name: 'OWASP Security Scanning & Vulnerability Patching', enabled: true },
    { name: 'Database Query Index Optimization & Vacuuming', enabled: true },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Agent Capability Manager</h3>
      <div className="space-y-3">
        {capabilities.map((cap) => (
          <div key={cap.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">{cap.name}</span>
            </div>
            <ToggleRight className="w-6 h-6 text-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
