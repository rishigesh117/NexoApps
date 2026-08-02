import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Database, GitBranch, BarChart3, Shield, TrendingUp, Activity, Server, AlertTriangle, CheckCircle } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';

export default function AdminDataPlatformPage() {
  const stats = [
    { label: 'Data Sources', value: '6', icon: <Database className="w-5 h-5" />, color: 'text-blue-400', trend: '+1 this week' },
    { label: 'ETL Jobs', value: '4', icon: <GitBranch className="w-5 h-5" />, color: 'text-emerald-400', trend: '2 running' },
    { label: 'Warehouse Size', value: '14.8 GB', icon: <Server className="w-5 h-5" />, color: 'text-violet-400', trend: '+0.4 GB today' },
    { label: 'Reports', value: '23', icon: <BarChart3 className="w-5 h-5" />, color: 'text-amber-400', trend: '5 scheduled' },
    { label: 'KPIs', value: '12', icon: <TrendingUp className="w-5 h-5" />, color: 'text-cyan-400', trend: '8 on-target' },
    { label: 'Data Quality', value: '95.9%', icon: <Shield className="w-5 h-5" />, color: 'text-emerald-400', trend: '2 issues' },
  ];

  const recentActivity = [
    { action: 'ETL job "User Activity Ingestion" completed', status: 'success', time: '2 min ago' },
    { action: 'Data quality check on fact_api_calls found 12 duplicates', status: 'warning', time: '5 min ago' },
    { action: 'Revenue Forecaster model retrained (88% accuracy)', status: 'success', time: '1 hr ago' },
    { action: 'Schema drift detected in fact_api_calls', status: 'error', time: '20 min ago' },
    { action: 'Snapshot created for fact_user_sessions', status: 'success', time: '30 min ago' },
    { action: 'Q2 Compliance Report generated', status: 'success', time: '3 hr ago' },
  ];

  return (
    <>
      <Head>
        <title>Admin Data Platform | NexoApps</title>
        <meta name="description" content="Enterprise Data Platform administration console for monitoring ETL, warehouse, and data quality." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-display font-bold mb-6">Data Platform Console</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {stats.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-panel rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`${s.color}`}>{s.icon}</div>
                      <span className="text-xs text-text-muted">{s.label}</span>
                    </div>
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-text-muted mt-1">{s.trend}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <h2 className="text-lg font-bold mb-3">Recent Activity</h2>
              <div className="glass-panel rounded-2xl border border-white/10 divide-y divide-white/5">
                {recentActivity.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.04 }} className="flex items-center gap-3 px-5 py-3">
                    {a.status === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : a.status === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />}
                    <span className="text-sm text-text-secondary flex-1">{a.action}</span>
                    <span className="text-xs text-text-muted whitespace-nowrap">{a.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
