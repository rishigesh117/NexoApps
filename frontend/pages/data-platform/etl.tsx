import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { GitBranch, Play, Clock, CheckCircle, XCircle, Loader2, Plus, Trash2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function ETLPage() {
  const jobs = [
    { id: '1', name: 'User Activity Ingestion', description: 'Ingests raw user activity logs into the warehouse', status: 'active', schedule: 'Every 4 hours', lastRun: '1 hr ago', rowsProcessed: 14523, rowsFailed: 3 },
    { id: '2', name: 'Revenue ETL Pipeline', description: 'Extracts billing data and loads into analytics warehouse', status: 'active', schedule: 'Daily at 2 AM', lastRun: '22 hr ago', rowsProcessed: 12045, rowsFailed: 0 },
    { id: '3', name: 'API Telemetry Sync', description: 'Syncs API gateway telemetry to data lake', status: 'idle', schedule: 'Every 30 min', lastRun: 'Never', rowsProcessed: 0, rowsFailed: 0 },
    { id: '4', name: 'CRM Contact Sync', description: 'Syncs Salesforce contacts into the user dimension table', status: 'active', schedule: 'Every 6 hours', lastRun: '3 hr ago', rowsProcessed: 8420, rowsFailed: 1 },
  ];

  const pipelines = [
    { id: '1', name: 'Full Data Lake Refresh', stages: ['Extract', 'Transform', 'Validate', 'Load'], status: 'active' },
    { id: '2', name: 'Real-Time Stream Pipeline', stages: ['Ingest', 'Enrich', 'Route'], status: 'active' },
  ];

  const statusIcon = (s: string) => {
    if (s === 'active') return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    if (s === 'running') return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
    if (s === 'failed') return <XCircle className="w-4 h-4 text-red-400" />;
    return <Clock className="w-4 h-4 text-text-muted" />;
  };

  return (
    <>
      <Head>
        <title>ETL Pipelines | NexoApps Data Platform</title>
        <meta name="description" content="Manage ETL jobs, data pipelines, and automated data transformation workflows." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-bold">ETL Pipelines</h1>
              <p className="text-text-secondary mt-1">Extract, Transform, Load — automated data pipeline orchestration.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-glow-cyan hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> New ETL Job
            </button>
          </div>

          {/* ETL Jobs */}
          <h2 className="text-xl font-bold mb-4">ETL Jobs</h2>
          <div className="space-y-3 mb-12">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <GitBranch className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{job.name}</h3>
                      {statusIcon(job.status)}
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5">{job.description}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-xs text-text-muted">
                    <div className="text-center">
                      <p className="text-white font-bold">{job.rowsProcessed.toLocaleString()}</p>
                      <p>Rows</p>
                    </div>
                    <div className="text-center">
                      <p className={`font-bold ${job.rowsFailed > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>{job.rowsFailed}</p>
                      <p>Failed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold">{job.schedule}</p>
                      <p>Schedule</p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-secondary">{job.lastRun}</p>
                      <p>Last Run</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors" title="Run Now"><Play className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Data Pipelines */}
          <h2 className="text-xl font-bold mb-4">Data Pipelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pipelines.map((pl, i) => (
              <motion.div key={pl.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }} className="glass-panel rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <GitBranch className="w-5 h-5 text-teal-400" />
                  <h3 className="font-bold text-white">{pl.name}</h3>
                  {statusIcon(pl.status)}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {pl.stages.map((stage, si) => (
                    <React.Fragment key={stage}>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">{stage}</span>
                      {si < pl.stages.length - 1 && <span className="text-text-muted text-xs">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
