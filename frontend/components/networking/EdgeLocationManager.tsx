import React, { useEffect, useState } from 'react';
import { Globe, Radio, CheckCircle2 } from 'lucide-react';
import { edgeService } from '../../services/edgeService';
import { EdgeLocation } from '../../../shared/types';

export const EdgeLocationManager: React.FC = () => {
  const [locations, setLocations] = useState<EdgeLocation[]>([]);

  useEffect(() => {
    edgeService.getLocations().then((res) => setLocations(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-cyan" /> Global Edge POP Locations
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {locations.map((loc) => (
          <div key={loc.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono font-bold text-brand-cyan">{loc.locationCode}</span>
              <span className="text-xs text-emerald-400 font-bold uppercase">{loc.status}</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{loc.locationName}</h3>
            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-white/10">
              <span>Region: {loc.region}</span>
              <span className="text-brand-cyan font-mono font-bold">{loc.latencyMs}ms</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
