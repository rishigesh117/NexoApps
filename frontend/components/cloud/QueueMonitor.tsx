import React from 'react';
import { Layers, RefreshCw, Trash2 } from 'lucide-react';

export const QueueMonitor: React.FC = () => {
  const queues = [
    { name: 'ai-inference-tasks', type: 'fifo', pending: 42, processing: 8, deadLetter: 0 },
    { name: 'webhook-deliveries', type: 'standard', pending: 120, processing: 15, deadLetter: 2 },
    { name: 'etl-job-runs', type: 'fifo', pending: 3, processing: 1, deadLetter: 0 },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Distributed Message Queues</h3>
          <p className="text-xs text-text-muted">Real-time queue depth, processing concurrency, and dead-letter monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {queues.map((q) => (
          <div key={q.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white">{q.name}</span>
              <span className="px-2 py-0.5 rounded-md bg-brand-cyan/20 text-brand-cyan text-[10px] font-bold uppercase">{q.type}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center py-2 bg-background/50 rounded-xl border border-white/5">
              <div>
                <p className="text-sm font-bold text-white">{q.pending}</p>
                <p className="text-[10px] text-text-muted">Pending</p>
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-400">{q.processing}</p>
                <p className="text-[10px] text-text-muted">Active</p>
              </div>
              <div>
                <p className="text-sm font-bold text-amber-400">{q.deadLetter}</p>
                <p className="text-[10px] text-text-muted">Dead-Letter</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
