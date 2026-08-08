import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { cloudResourceService } from '../../services/cloudResourceService';
import { CloudResource } from '../../../shared/types';

export const CloudResourceExplorer: React.FC = () => {
  const [resources, setResources] = useState<CloudResource[]>([]);

  useEffect(() => {
    cloudResourceService.getResources().then((res) => setResources(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-cyan" /> Multi-Cloud Resource Explorer & Inventory
        </h2>
        <span className="text-xs text-text-muted">{resources.length} active resources</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((r) => (
          <div key={r.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                {r.resourceTypeId}
              </span>
              <span className="text-xs text-emerald-400 font-bold uppercase">{r.status}</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{r.resourceName}</h3>
            <div className="text-xs text-text-muted font-mono truncate pt-2 border-t border-white/10">
              Provider ID: <strong className="text-white">{r.providerResourceId}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
