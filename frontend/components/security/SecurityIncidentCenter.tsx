import React from 'react';
import { ShieldAlert, CheckCircle } from 'lucide-react';

export const SecurityIncidentCenter: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Security Incident Response Center (SOC)</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <h3 className="font-semibold text-white mb-2">Automated Incident Containment Playbook</h3>
        <p className="text-xs text-slate-400">Zero active security incidents. Auto-isolation rules active.</p>
      </div>
    </div>
  );
};
