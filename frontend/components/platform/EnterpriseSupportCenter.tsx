import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';
import { maintenanceService } from '../../services/maintenanceService';
import { EnterpriseSupport } from '../../../shared/types';

export const EnterpriseSupportCenter: React.FC = () => {
  const [tickets, setTickets] = useState<EnterpriseSupport[]>([]);

  useEffect(() => {
    maintenanceService.getTickets().then(setTickets);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">24/7 Enterprise Support Portal</h2>
      <div className="space-y-4 max-w-4xl">
        {tickets.map(t => (
          <div key={t.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-white">{t.subject}</h3>
                <p className="text-xs text-slate-400 font-mono">Ticket ID: {t.ticketId}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
