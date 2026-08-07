import React, { useEffect, useState } from 'react';
import { Clock, Plus, CheckCircle2 } from 'lucide-react';
import { getBackgroundJobs } from '../../services/queueService';
import { JobSchedule } from '../../../shared/types';

export const SchedulerManager: React.FC = () => {
  const [schedules, setSchedules] = useState<JobSchedule[]>([]);

  useEffect(() => {
    getBackgroundJobs().then((res) => setSchedules(res.schedules));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-brand-cyan" /> Job Scheduler Engine (Cron)
        </h2>
        <p className="text-text-muted text-sm">Automated scheduled job execution triggers and cron timers</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {schedules.map((s) => (
          <div key={s.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{s.scheduleName}</h4>
              <p className="text-brand-cyan font-mono text-xs">Cron: {s.cronExpression}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
