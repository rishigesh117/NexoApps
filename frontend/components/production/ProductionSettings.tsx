import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

export const ProductionSettings: React.FC = () => {
  const [autoPurge, setAutoPurge] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sliders className="w-6 h-6 text-brand-cyan" /> Production Settings & Infrastructure Policies
        </h2>
        <p className="text-text-muted text-sm">Global caching policies, queue retries and telemetry retention</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-white text-sm">Automatic Cache Invalidation</h4>
            <p className="text-text-muted text-xs">Purge stale edge CDN cache on release deployments</p>
          </div>
          <input
            type="checkbox"
            checked={autoPurge}
            onChange={(e) => setAutoPurge(e.target.checked)}
            className="w-4 h-4 accent-brand-cyan"
          />
        </div>
      </div>
    </div>
  );
};
