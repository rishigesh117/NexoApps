import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getDatabaseReplication } from '../../services/replicationService';
import { FailoverEvent } from '../../../shared/types';

export const FailoverManager: React.FC = () => {
  const [events, setEvents] = useState<FailoverEvent[]>([]);

  useEffect(() => {
    getDatabaseReplication().then((res) => setEvents(res.failovers));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-brand-cyan" /> Automatic Failover & HA Manager
        </h2>
        <p className="text-text-muted text-sm">Patroni primary leader election, failover logs & quorum status</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {events.map((e) => (
          <div key={e.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{e.failoverReason}</h4>
              <p className="text-text-muted text-xs">Old Primary: {e.oldPrimaryId} → New Primary: <strong className="text-brand-cyan">{e.newPrimaryId}</strong></p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Promoted
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
