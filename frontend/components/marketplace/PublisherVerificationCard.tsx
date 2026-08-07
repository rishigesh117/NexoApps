import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PublisherVerificationCard: React.FC = () => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        Verified Creator Badge & Domain Verification
      </h3>
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
        <p className="text-emerald-400 font-bold flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" /> Identity & Domain Security Audit Passed
        </p>
        <p className="text-text-secondary">Official badge active on marketplace listings.</p>
      </div>
    </div>
  );
};
