import React, { useEffect, useState } from 'react';
import { Globe, CheckCircle2 } from 'lucide-react';
import { cloudRegionService } from '../../services/cloudRegionService';
import { CloudRegion } from '../../../shared/types';

export const RegionManager: React.FC = () => {
  const [regions, setRegions] = useState<CloudRegion[]>([]);

  useEffect(() => {
    cloudRegionService.getRegions().then((res) => setRegions(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-cyan" /> Multi-Region Cloud Infrastructure Regions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {regions.map((r) => (
          <div key={r.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-brand-cyan font-bold">{r.regionCode}</span>
              <span className="text-xs text-emerald-400 font-bold uppercase">{r.status}</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{r.regionName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
