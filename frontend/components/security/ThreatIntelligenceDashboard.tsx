import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { threatService } from '../../services/threatService';
import { ThreatIntel } from '../../../shared/types';

export const ThreatIntelligenceDashboard: React.FC = () => {
  const [threats, setThreats] = useState<ThreatIntel[]>([]);

  useEffect(() => {
    threatService.getThreats().then(setThreats);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">AI Threat Intelligence Feed</h2>
      <div className="space-y-4 max-w-4xl">
        {threats.map(t => (
          <div key={t.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
              <div>
                <h3 className="font-semibold text-white font-mono">{t.indicator}</h3>
                <p className="text-xs text-slate-400">{t.threatType}</p>
              </div>
            </div>
            <span className="text-lg font-bold text-amber-400">Risk Score: {t.riskScore}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
