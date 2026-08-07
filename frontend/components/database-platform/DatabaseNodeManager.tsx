import React, { useEffect, useState } from 'react';
import { Server, CheckCircle2 } from 'lucide-react';
import { getDatabaseClusters } from '../../services/databasePlatformService';
import { DatabaseNode } from '../../../shared/types';

export const DatabaseNodeManager: React.FC = () => {
  const [nodes, setNodes] = useState<DatabaseNode[]>([]);

  useEffect(() => {
    getDatabaseClusters().then((res) => setNodes(res.nodes));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Server className="w-6 h-6 text-brand-cyan" /> Database Node Manager
        </h2>
        <p className="text-text-muted text-sm">Primary and read replica compute node provisioning & status</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {nodes.map((n) => (
          <div key={n.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{n.nodeName}</h4>
              <p className="text-text-muted text-xs font-mono">Host: {n.hostIp}:{n.port} • Role: {n.role}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Online
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
