import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Layers, Plus, Settings, Grip, BarChart3, LineChart, PieChart, Table2, Activity } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function DashboardsPage() {
  const dashboards = [
    { id: '1', name: 'Executive Overview', description: 'C-Suite executive KPI dashboard with revenue, users, and platform health', widgetCount: 5, isDefault: true, createdBy: 'admin' },
    { id: '2', name: 'Engineering Metrics', description: 'API performance, deployment frequency, and error budgets', widgetCount: 4, isDefault: false, createdBy: 'engineering' },
    { id: '3', name: 'Sales Pipeline', description: 'Lead conversion, deal velocity, and pipeline value', widgetCount: 3, isDefault: false, createdBy: 'sales' },
  ];

  const widgetTypes = [
    { type: 'KPI Card', icon: <Activity className="w-5 h-5" />, color: 'text-blue-400 bg-blue-500/10' },
    { type: 'Line Chart', icon: <LineChart className="w-5 h-5" />, color: 'text-emerald-400 bg-emerald-500/10' },
    { type: 'Bar Chart', icon: <BarChart3 className="w-5 h-5" />, color: 'text-amber-400 bg-amber-500/10' },
    { type: 'Pie Chart', icon: <PieChart className="w-5 h-5" />, color: 'text-rose-400 bg-rose-500/10' },
    { type: 'Data Table', icon: <Table2 className="w-5 h-5" />, color: 'text-violet-400 bg-violet-500/10' },
    { type: 'Metric Grid', icon: <Grip className="w-5 h-5" />, color: 'text-cyan-400 bg-cyan-500/10' },
  ];

  return (
    <>
      <Head>
        <title>Dashboard Builder | NexoApps Data Platform</title>
        <meta name="description" content="Drag-and-drop dashboard builder with customizable widgets and layout designer." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-bold">Dashboard Builder</h1>
              <p className="text-text-secondary mt-1">Create custom BI dashboards with drag-and-drop widgets.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> New Dashboard
            </button>
          </div>

          {/* Dashboards */}
          <div className="space-y-4 mb-12">
            {dashboards.map((db, i) => (
              <motion.div key={db.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-rose-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-rose-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{db.name}</h3>
                      {db.isDefault && <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase">Default</span>}
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5">{db.description}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-xs text-text-muted">
                    <div className="text-center">
                      <p className="text-white font-bold">{db.widgetCount}</p>
                      <p>Widgets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-secondary">{db.createdBy}</p>
                      <p>Owner</p>
                    </div>
                  </div>
                  <button className="p-2.5 rounded-xl bg-surface-100 hover:bg-white/5 border border-white/10 text-text-muted hover:text-white transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Widget Library */}
          <h2 className="text-xl font-bold mb-4">Widget Library</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {widgetTypes.map((w, i) => (
              <motion.div key={w.type} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.05 }} className="glass-panel rounded-xl p-4 border border-white/10 text-center hover:border-rose-500/30 transition-all cursor-pointer group">
                <div className={`w-10 h-10 rounded-lg ${w.color} flex items-center justify-center mx-auto mb-2`}>{w.icon}</div>
                <p className="text-xs font-semibold text-text-secondary group-hover:text-white transition-colors">{w.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
