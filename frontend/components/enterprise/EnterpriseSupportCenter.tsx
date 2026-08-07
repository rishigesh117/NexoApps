import React, { useEffect, useState } from 'react';
import { HelpCircle, Plus, CheckCircle2 } from 'lucide-react';
import { getEnterpriseSupportCases } from '../../services/enterpriseSupportService';
import { EnterpriseSupport as SupportType } from '../../../shared/types';

export const EnterpriseSupportCenter: React.FC = () => {
  const [cases, setCases] = useState<SupportType[]>([]);

  useEffect(() => {
    getEnterpriseSupportCases().then(setCases);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-brand-cyan" /> 24/7 Enterprise Support Center
          </h2>
          <p className="text-text-muted text-sm">Dedicated enterprise SLA support, ticket management & resolution</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {cases.map((c) => (
          <div key={c.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-brand-cyan font-mono font-bold">{c.ticketNumber}</span>
              <h4 className="font-semibold text-white text-sm mt-0.5">{c.subject}</h4>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
