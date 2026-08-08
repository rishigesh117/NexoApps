import React, { useEffect, useState } from 'react';
import { Layers } from 'lucide-react';
import { cloudRegionService } from '../../services/cloudRegionService';
import { CloudZone } from '../../../shared/types';

export const ZoneManager: React.FC = () => {
  const [zones, setZones] = useState<CloudZone[]>([]);

  useEffect(() => {
    cloudRegionService.getZones().then((res) => setZones(res));
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Availability Zones</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {zones.map((z) => (
          <div key={z.id} className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-2 text-xs">
            <span className="font-mono text-purple-400 font-bold">{z.zoneCode}</span>
            <h4 className="font-bold text-white text-sm">{z.zoneName}</h4>
            <div className="text-emerald-400 font-bold uppercase text-[10px]">{z.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
