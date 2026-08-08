import React, { useEffect, useState } from 'react';
import { Bot, Play, CheckCircle2, RefreshCw } from 'lucide-react';
import { uptimeService } from '../../services/uptimeService';
import { SyntheticMonitor } from '../../../shared/types';

export const SyntheticMonitoring: React.FC = () => {
  const [monitors, setMonitors] = useState<SyntheticMonitor[]>([]);

  useEffect(() => {
    uptimeService.getSyntheticMonitors().then((res) => setMonitors(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-brand-cyan" /> Synthetic Endpoint & Workflow Monitoring
        </h2>
        <span className="text-xs text-text-muted">{monitors.length} synthetic scenarios running</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {monitors.map((synth) => (
          <div key={synth.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                {synth.scriptType}
              </span>
              <span className="text-xs text-emerald-400 font-bold">{synth.successRatePct}% Success</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{synth.monitorName}</h3>
            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-white/10">
              <span>Frequency: every {synth.frequencyMinutes}m</span>
              <span className="text-emerald-400 capitalize font-medium">{synth.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
