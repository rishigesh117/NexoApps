import React, { useState, useEffect } from 'react';
import { Globe, CheckCircle2 } from 'lucide-react';
import { cloudPlatformService } from '../../services/cloudPlatformService';
import { CloudRegion } from '../../../shared/types';

export const RegionManager: React.FC = () => {
  const [regions, setRegions] = useState<CloudRegion[]>([]);

  useEffect(() => {
    cloudPlatformService.getRegions().then(setRegions);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Cloud Regions & Availability Zones</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {regions.map(r => (
          <div key={r.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-6 h-6 text-cyan-400" />
              <h3 className="font-semibold text-white">{r.name}</h3>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-4">{r.code} ({r.location})</p>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold flex items-center gap-1 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" /> Operational
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
