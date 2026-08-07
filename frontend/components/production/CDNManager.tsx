import React, { useEffect, useState } from 'react';
import { Globe, CheckCircle2, RefreshCw } from 'lucide-react';
import { getStorageData } from '../../services/storageService';
import { CDNConfiguration } from '../../../shared/types';

export const CDNManager: React.FC = () => {
  const [cdns, setCdns] = useState<CDNConfiguration[]>([]);

  useEffect(() => {
    getStorageData().then((res) => setCdns(res.cdns));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="w-6 h-6 text-brand-cyan" /> Content Delivery Network (CDN) Manager
        </h2>
        <p className="text-text-muted text-sm">Edge caching endpoints, origin routing & cache purging</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {cdns.map((c) => (
          <div key={c.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{c.domainName}</h4>
              <p className="text-text-muted text-xs">Origin: {c.originUrl}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
