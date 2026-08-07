import React from 'react';
import { ShieldCheck, Lock, Activity } from 'lucide-react';

export const ZeroTrustCenter: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Zero Trust Policy & Verification Center</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-2xl">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> Never Trust, Always Verify Architecture
        </h3>
        <p className="text-sm text-slate-300">Continuous context-aware access evaluation, device posture checks, dynamic network micro-segmentation, and ephemeral credentials.</p>
      </div>
    </div>
  );
};
