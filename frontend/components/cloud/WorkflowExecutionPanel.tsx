import React from 'react';
import { CheckCircle2, Clock, Terminal } from 'lucide-react';

export const WorkflowExecutionPanel: React.FC = () => {
  const runs = [
    { id: 'run-101', status: 'completed', duration: '4.5s', triggeredBy: 'manual', timestamp: '10 min ago' },
    { id: 'run-100', status: 'completed', duration: '5.2s', triggeredBy: 'event', timestamp: '1 hr ago' },
    { id: 'run-099', status: 'completed', duration: '4.8s', triggeredBy: 'cron', timestamp: '6 hr ago' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Execution History & Logs</h3>
      <div className="space-y-2">
        {runs.map((run) => (
          <div key={run.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-100 border border-white/10 text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-mono font-bold text-white">{run.id}</span>
              <span className="text-text-muted">Triggered by {run.triggeredBy}</span>
            </div>
            <div className="flex items-center gap-4 text-text-muted">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {run.duration}</span>
              <span>{run.timestamp}</span>
              <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-brand-cyan font-semibold transition-colors">
                <Terminal className="w-3 h-3" /> Logs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
