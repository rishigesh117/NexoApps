import React, { useEffect, useState } from 'react';
import { HardDrive, CheckCircle2 } from 'lucide-react';
import { getStorageClusters } from '../../services/storageClusterService';
import { StorageCluster, StorageNode } from '../../../shared/types';

export const StorageClusterExplorer: React.FC = () => {
  const [data, setData] = useState<{ clusters: StorageCluster[]; nodes: StorageNode[] }>({ clusters: [], nodes: [] });

  useEffect(() => {
    getStorageClusters().then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HardDrive className="w-6 h-6 text-brand-cyan" /> Distributed Storage Cluster Explorer
        </h2>
        <p className="text-text-muted text-sm">Ceph / Rook block storage pools, OSD nodes & replica health</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        {data.clusters.map((c) => (
          <div key={c.id} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">{c.clusterName}</h3>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
              </span>
            </div>
            <p className="text-xs text-text-muted">Total Capacity: {c.totalCapacityGb} GB • Used: {c.usedCapacityGb} GB</p>
          </div>
        ))}
      </div>
    </div>
  );
};
