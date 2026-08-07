import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const GovernanceCenter: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Data Governance & Policy Enforcement Center</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-xl">
        <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> GDPR & HIPAA Compliance Enforced
        </h3>
        <p className="text-xs text-slate-400">Automatic PII data masking, role-based column access control, and audit trail logging.</p>
      </div>
    </div>
  );
};
