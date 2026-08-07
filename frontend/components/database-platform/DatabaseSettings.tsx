import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

export const DatabaseSettings: React.FC = () => {
  const [autoFailover, setAutoFailover] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sliders className="w-6 h-6 text-brand-cyan" /> Database Governance & HA Settings
        </h2>
        <p className="text-text-muted text-sm">Automatic Patroni leader promotion and connection pool limits</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-white text-sm">Automatic Leader Promotion</h4>
            <p className="text-text-muted text-xs">Automatically promote healthy read-replica on primary node fault</p>
          </div>
          <input
            type="checkbox"
            checked={autoFailover}
            onChange={(e) => setAutoFailover(e.target.checked)}
            className="w-4 h-4 accent-brand-cyan"
          />
        </div>
      </div>
    </div>
  );
};
