import React, { useEffect, useState } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { getDatabaseReplication } from '../../services/replicationService';
import { ReplicationGroup, ReplicationStatus } from '../../../shared/types';

export const ReplicationCenter: React.FC = () => {
  const [data, setData] = useState<{ groups: ReplicationGroup[]; statuses: ReplicationStatus[] }>({ groups: [], statuses: [] });

  useEffect(() => {
    getDatabaseReplication().then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-brand-cyan" /> Streaming Replication Center
        </h2>
        <p className="text-text-muted text-sm">PostgreSQL WAL physical streaming replication & replica lag tracking</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        {data.groups.map((g) => (
          <div key={g.id} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">{g.groupName}</h3>
              <span className="px-2.5 py-0.5 bg-brand-cyan/20 text-brand-cyan text-xs font-semibold rounded-full">
                {g.replicationMode}
              </span>
            </div>
            <div className="space-y-2 pt-1">
              {data.statuses.map((s) => (
                <div key={s.id} className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">Replica Ref: {s.replicaNodeId}</span>
                    <span className="text-text-muted block">Replication Lag: <strong className="text-brand-cyan">{s.replicationLagMs} ms</strong></span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> In Sync
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
