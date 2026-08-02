import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FileText, Plus, Calendar, Download, BarChart3, LineChart, Table2, PieChart } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function ReportsPage() {
  const reports = [
    { id: '1', name: 'Monthly Revenue Report', description: 'Revenue breakdown by plan, region, and channel', type: 'bar_chart', icon: <BarChart3 className="w-5 h-5" />, createdBy: 'admin', schedules: 1, exports: 4 },
    { id: '2', name: 'User Growth Dashboard', description: 'Daily active users, signups, and churn metrics', type: 'line_chart', icon: <LineChart className="w-5 h-5" />, createdBy: 'admin', schedules: 2, exports: 8 },
    { id: '3', name: 'API Usage Breakdown', description: 'Endpoint usage, latency, and error rate analysis', type: 'table', icon: <Table2 className="w-5 h-5" />, createdBy: 'developer', schedules: 0, exports: 2 },
    { id: '4', name: 'Plan Distribution', description: 'Customer distribution across pricing plans', type: 'pie_chart', icon: <PieChart className="w-5 h-5" />, createdBy: 'sales', schedules: 1, exports: 3 },
    { id: '5', name: 'Compliance Audit Trail', description: 'Security and compliance audit summary', type: 'table', icon: <Table2 className="w-5 h-5" />, createdBy: 'admin', schedules: 1, exports: 6 },
  ];

  return (
    <>
      <Head>
        <title>Reports & Business Intelligence | NexoApps Data Platform</title>
        <meta name="description" content="Custom report builder with scheduled exports, visualizations, and sharing." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-bold">Reports & BI</h1>
              <p className="text-text-secondary mt-1">Build, schedule, and export custom business intelligence reports.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> New Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reports.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-amber-500/30 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-400">
                    {r.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate group-hover:text-amber-400 transition-colors">{r.name}</h3>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">{r.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <p className="text-xs text-text-secondary mb-4">{r.description}</p>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {r.schedules} Schedules</span>
                    <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {r.exports} Exports</span>
                  </div>
                  <span className="text-text-muted">by {r.createdBy}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
