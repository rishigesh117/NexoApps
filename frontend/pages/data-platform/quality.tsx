import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function DataQualityPage() {
  const overview = { totalChecks: 148, passed: 142, warnings: 4, failed: 2, healthScore: 95.9 };

  const logs = [
    { table: 'fact_user_sessions', check: 'Completeness', status: 'passed', issues: 0, detail: 'All required fields are populated', time: '2 min ago' },
    { table: 'fact_api_calls', check: 'Uniqueness', status: 'warning', issues: 12, detail: '12 duplicate primary keys detected', time: '5 min ago' },
    { table: 'fact_revenue', check: 'Accuracy', status: 'passed', issues: 0, detail: 'Revenue totals match source within 0.01%', time: '10 min ago' },
    { table: 'dim_users', check: 'Freshness', status: 'passed', issues: 0, detail: 'Data refreshed within the last 15 minutes', time: '12 min ago' },
    { table: 'fact_deployments', check: 'Consistency', status: 'passed', issues: 0, detail: 'All foreign keys resolve correctly', time: '15 min ago' },
    { table: 'fact_api_calls', check: 'Schema Drift', status: 'failed', issues: 2, detail: '2 unexpected columns detected after source update', time: '20 min ago' },
  ];

  const statusIcon = (s: string) => {
    if (s === 'passed') return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    if (s === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    return <XCircle className="w-4 h-4 text-red-400" />;
  };

  return (
    <>
      <Head>
        <title>Data Quality | NexoApps Data Platform</title>
        <meta name="description" content="Automated data quality checks, validation rules, and health score monitoring." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-display font-bold mb-2">Data Quality</h1>
          <p className="text-text-secondary mb-10">Automated validation checks, health scoring, and anomaly detection.</p>

          {/* Health Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            <div className="glass-panel rounded-2xl p-5 border border-white/10 text-center">
              <p className="text-3xl font-bold text-emerald-400">{overview.healthScore}%</p>
              <p className="text-xs text-text-muted mt-1">Health Score</p>
            </div>
            <div className="glass-panel rounded-2xl p-5 border border-white/10 text-center">
              <p className="text-2xl font-bold text-white">{overview.totalChecks}</p>
              <p className="text-xs text-text-muted mt-1">Total Checks</p>
            </div>
            <div className="glass-panel rounded-2xl p-5 border border-white/10 text-center">
              <p className="text-2xl font-bold text-emerald-400">{overview.passed}</p>
              <p className="text-xs text-text-muted mt-1">Passed</p>
            </div>
            <div className="glass-panel rounded-2xl p-5 border border-white/10 text-center">
              <p className="text-2xl font-bold text-amber-400">{overview.warnings}</p>
              <p className="text-xs text-text-muted mt-1">Warnings</p>
            </div>
            <div className="glass-panel rounded-2xl p-5 border border-white/10 text-center">
              <p className="text-2xl font-bold text-red-400">{overview.failed}</p>
              <p className="text-xs text-text-muted mt-1">Failed</p>
            </div>
          </motion.div>

          {/* Quality Logs */}
          <h2 className="text-xl font-bold mb-4">Recent Quality Checks</h2>
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-surface-100 border-b border-white/10 text-xs font-bold text-text-muted uppercase tracking-wider">
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Table</div>
              <div className="col-span-2">Check Type</div>
              <div className="col-span-1 text-center">Issues</div>
              <div className="col-span-4">Detail</div>
              <div className="col-span-1 text-right">Time</div>
            </div>
            {logs.map((log, i) => (
              <motion.div key={`${log.table}-${log.check}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.04 }} className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center">
                <div className="col-span-2 flex items-center gap-2">
                  {statusIcon(log.status)}
                  <span className={`text-xs font-semibold capitalize ${log.status === 'passed' ? 'text-emerald-400' : log.status === 'warning' ? 'text-amber-400' : 'text-red-400'}`}>{log.status}</span>
                </div>
                <div className="col-span-2 font-mono text-xs text-white">{log.table}</div>
                <div className="col-span-2 text-xs text-text-secondary">{log.check}</div>
                <div className="col-span-1 text-center text-xs font-bold text-white">{log.issues}</div>
                <div className="col-span-4 text-xs text-text-secondary">{log.detail}</div>
                <div className="col-span-1 text-right text-xs text-text-muted">{log.time}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
