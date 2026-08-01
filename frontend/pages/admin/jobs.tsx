import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { JobSchedulerCard } from '../../components/operations/JobSchedulerCard';
import { getJobs } from '../../services/operationsService';
import { JobSchedule } from '../../types';
import { Clock } from 'lucide-react';

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobSchedule[]>([]);

  useEffect(() => {
    getJobs().then((j) => setJobs(j)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Background Job Scheduler | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-400" /> Background Cron Job Scheduler
          </h1>
          <p className="text-xs text-text-secondary">
            Manage automated cron tasks including nightly cache purge, backup verification, and analytics aggregation.
          </p>
        </div>

        <JobSchedulerCard jobs={jobs} />
      </div>
    </AdminLayout>
  );
}
