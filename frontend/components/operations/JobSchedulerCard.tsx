import React from 'react';
import { JobSchedule } from '../../types';
import { Clock, Play, CheckCircle2 } from 'lucide-react';

interface JobSchedulerCardProps {
  jobs: JobSchedule[];
}

export const JobSchedulerCard: React.FC<JobSchedulerCardProps> = ({ jobs }) => {
  return (
    <div className="space-y-4 text-left">
      {jobs.map((j) => (
        <div key={j.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 transition-all shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h4 className="font-extrabold text-white text-sm">{j.jobName}</h4>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {j.status}
              </span>
            </div>
            <p className="text-xs text-text-muted">
              Cron: <span className="font-mono text-brand-cyan">{j.cronExpression}</span> • Total Executions: {j.runCount}
            </p>
            <p className="text-[11px] text-text-secondary">
              Next Run: {j.nextRunAt ? new Date(j.nextRunAt).toLocaleString() : 'Pending'}
            </p>
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Run Now</span>
          </button>
        </div>
      ))}
    </div>
  );
};
