import React, { useEffect, useState } from 'react';
import { Database, Plus, CheckCircle2 } from 'lucide-react';
import { getDatabaseClusters } from '../../services/databasePlatformService';
import { DatabaseCluster, DatabaseNode } from '../../../shared/types';

export const ClusterManager: React.FC = () => {
  const [data, setData] = useState<{ clusters: DatabaseCluster[]; nodes: DatabaseNode[] }>({ clusters: [], nodes: [] });

  useEffect(() => {
    getDatabaseClusters().then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-brand-cyan" /> PostgreSQL Cluster Manager
          </h2>
          <p className="text-text-muted text-sm">Clustered database instances, primary/read-replica topology & Patroni HA</p>
        </div>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        {data.clusters.map((c) => (
          <div key={c.id} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{c.clusterName}</h3>
                <p className="text-xs text-text-muted">Engine: {c.engineType} v{c.version}</p>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {data.nodes.map((n) => (
                <div key={n.id} className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{n.nodeName}</span>
                    <span className="text-text-muted block font-mono">{n.hostIp}:{n.port}</span>
                  </div>
                  <span className={`px-2 py-0.5 font-mono rounded text-xs font-bold ${
                    n.role === 'primary' ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {n.role}
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
