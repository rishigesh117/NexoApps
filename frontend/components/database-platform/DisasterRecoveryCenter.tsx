import React, { useEffect, useState } from 'react';
import { Globe, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getDisasterRecoverySites } from '../../services/databasePlatformService';
import { DisasterRecoverySite } from '../../../shared/types';

export const DisasterRecoveryCenter: React.FC = () => {
  const [sites, setSites] = useState<DisasterRecoverySite[]>([]);

  useEffect(() => {
    getDisasterRecoverySites().then(setSites);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="w-6 h-6 text-brand-cyan" /> Multi-Region Disaster Recovery (DR) Center
        </h2>
        <p className="text-text-muted text-sm">Active-standby cross-region replication & automatic disaster recovery failover</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {sites.map((s) => (
          <div key={s.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{s.siteName}</h4>
              <p className="text-text-muted text-xs">Region: {s.region}</p>
            </div>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Standby Synced
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
