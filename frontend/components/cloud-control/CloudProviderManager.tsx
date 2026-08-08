import React, { useEffect, useState } from 'react';
import { Cloud, CheckCircle2 } from 'lucide-react';
import { cloudControlService } from '../../services/cloudControlService';
import { CloudProvider } from '../../../shared/types';

export const CloudProviderManager: React.FC = () => {
  const [providers, setProviders] = useState<CloudProvider[]>([]);

  useEffect(() => {
    cloudControlService.getProviders().then((res) => setProviders(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Cloud className="w-5 h-5 text-brand-cyan" /> Multi-Cloud Provider Registry
        </h2>
        <span className="text-xs text-text-muted">{providers.length} connected providers</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((p) => (
          <div key={p.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                {p.providerType}
              </span>
              <span className="text-xs text-emerald-400 font-bold uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {p.status}
              </span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{p.providerName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
