import React, { useEffect, useState } from 'react';
import { Play, CheckCircle2, RefreshCw } from 'lucide-react';
import { getBackgroundJobs } from '../../services/queueService';
import { BackgroundJob } from '../../../shared/types';

export const BackgroundJobCenter: React.FC = () => {
  const [jobs, setJobs] = useState<BackgroundJob[]>([]);

  useEffect(() => {
    getBackgroundJobs().then((res) => setJobs(res.jobs));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Play className="w-6 h-6 text-brand-cyan" /> Asynchronous Worker & Background Jobs Center
        </h2>
        <p className="text-text-muted text-sm">Background execution pool, retry queue & worker thread status</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {jobs.map((j) => (
          <div key={j.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{j.jobName}</h4>
              <p className="text-text-muted text-xs">Type: {j.jobType}</p>
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 ${
              j.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" /> {j.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
