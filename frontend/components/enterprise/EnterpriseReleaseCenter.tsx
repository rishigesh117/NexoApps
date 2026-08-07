import React, { useState } from 'react';
import { Rocket, CheckCircle2, Award } from 'lucide-react';

export const EnterpriseReleaseCenter: React.FC = () => {
  const [releases] = useState([
    { version: '9.0.0', name: 'NexoApps AI Enterprise Universe Production Release', changelog: 'Unified Phase 1A-11D ecosystem, AI Collaboration Platform, enterprise orchestration, 100% backward compatible.', date: 'August 2026' },
    { version: '8.4.0', name: 'AI Collaboration Platform', changelog: 'Digital workplace, document libraries, whiteboards, team channels.', date: 'August 2026' }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Rocket className="w-6 h-6 text-brand-cyan" /> Enterprise Release & LTS Lifecycle Center
        </h2>
        <p className="text-text-muted text-sm">Long-Term Support (LTS) release history and version tracking</p>
      </div>

      <div className="space-y-4">
        {releases.map((rel) => (
          <div key={rel.version} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-gradient-to-r from-brand-cyan to-brand-violet text-background font-bold text-xs rounded-full">v{rel.version} Production</span>
              <span className="text-xs text-text-muted">{rel.date}</span>
            </div>
            <h3 className="font-bold text-white text-base">{rel.name}</h3>
            <p className="text-text-secondary text-xs">{rel.changelog}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
