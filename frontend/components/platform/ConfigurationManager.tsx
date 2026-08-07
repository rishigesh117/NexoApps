import React, { useState, useEffect } from 'react';
import { Sliders, Save } from 'lucide-react';
import { configurationService } from '../../services/configurationService';
import { GlobalConfiguration } from '../../../shared/types';

export const ConfigurationManager: React.FC = () => {
  const [configs, setConfigs] = useState<GlobalConfiguration[]>([]);

  useEffect(() => {
    configurationService.getConfigs().then(setConfigs);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Global Platform Configuration Engine</h2>
      <div className="space-y-4 max-w-3xl">
        {configs.map(c => (
          <div key={c.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-white font-mono">{c.configKey}</h3>
              <p className="text-xs text-slate-400">Category: {c.category}</p>
            </div>
            <span className="px-3 py-1 bg-slate-900 text-cyan-400 font-mono text-sm rounded font-bold">{c.configValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
