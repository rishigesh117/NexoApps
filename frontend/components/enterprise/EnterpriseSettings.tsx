import React, { useState } from 'react';
import { Sliders, Shield, Lock } from 'lucide-react';

export const EnterpriseSettings: React.FC = () => {
  const [globalRBAC, setGlobalRBAC] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sliders className="w-6 h-6 text-brand-cyan" /> Enterprise Settings & Governance
        </h2>
        <p className="text-text-muted text-sm">Global policy enforcement and platform governance</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-white text-sm">Strict Multi-Tenant Isolation</h4>
            <p className="text-text-muted text-xs">Enforce strict data boundary isolation across workspaces</p>
          </div>
          <input
            type="checkbox"
            checked={globalRBAC}
            onChange={(e) => setGlobalRBAC(e.target.checked)}
            className="w-4 h-4 accent-brand-cyan"
          />
        </div>
      </div>
    </div>
  );
};
