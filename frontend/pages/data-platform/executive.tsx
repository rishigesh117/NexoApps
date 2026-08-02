import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Crown, TrendingUp, TrendingDown, Users, DollarSign, Activity, Shield, Zap, Server } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function ExecutiveDashboardPage() {
  const execKPIs = [
    { label: 'Revenue Growth', value: '+4.9%', icon: <DollarSign className="w-5 h-5" />, color: 'from-emerald-500 to-green-500', trend: 'up' },
    { label: 'User Growth', value: '+8.2%', icon: <Users className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500', trend: 'up' },
    { label: 'Platform Uptime', value: '99.97%', icon: <Server className="w-5 h-5" />, color: 'from-violet-500 to-purple-500', trend: 'flat' },
    { label: 'CSAT Score', value: '4.6/5', icon: <Crown className="w-5 h-5" />, color: 'from-amber-500 to-yellow-500', trend: 'up' },
  ];

  const detailedMetrics = [
    { category: 'Financial', metrics: [
      { name: 'MRR', value: '$284,500', change: '+$13,300', positive: true },
      { name: 'Projected ARR', value: '$3.41M', change: '+$480K', positive: true },
      { name: 'Net Revenue Retention', value: '112%', change: '+3%', positive: true },
    ]},
    { category: 'Product', metrics: [
      { name: 'Active Projects', value: '47', change: '+5', positive: true },
      { name: 'Deploy Frequency', value: '12/day', change: '+2', positive: true },
      { name: 'Incidents/Month', value: '2', change: '-1', positive: true },
    ]},
    { category: 'Engineering', metrics: [
      { name: 'Avg Response Time', value: '142 ms', change: '-8 ms', positive: true },
      { name: 'Error Rate', value: '0.03%', change: '-0.01%', positive: true },
      { name: 'Data Quality Score', value: '95.9%', change: '+1.2%', positive: true },
    ]},
  ];

  const dashboards = [
    { name: 'CEO Dashboard', description: 'Revenue, growth, customer satisfaction, and strategic KPIs', icon: <Crown className="w-6 h-6" />, color: 'from-amber-500/20 to-yellow-500/20', iconColor: 'text-amber-400' },
    { name: 'CTO Dashboard', description: 'Platform reliability, API performance, and engineering velocity', icon: <Server className="w-6 h-6" />, color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
    { name: 'CFO Dashboard', description: 'Financial metrics, cash flow, and revenue projections', icon: <DollarSign className="w-6 h-6" />, color: 'from-emerald-500/20 to-green-500/20', iconColor: 'text-emerald-400' },
  ];

  return (
    <>
      <Head>
        <title>Executive Dashboard | NexoApps Data Platform</title>
        <meta name="description" content="C-Suite executive dashboard with strategic KPIs, revenue metrics, and platform health." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 mb-4">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Executive Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Strategic Overview</h1>
            <p className="text-text-secondary">Real-time executive summary of key business metrics.</p>
          </motion.div>

          {/* Executive KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {execKPIs.map((kpi, i) => (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-panel rounded-2xl p-6 border border-white/10 text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} p-0.5 mx-auto mb-3`}>
                  <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center text-white">{kpi.icon}</div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{kpi.value}</p>
                <p className="text-xs text-text-muted">{kpi.label}</p>
                <div className="mt-2">
                  {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto" /> : kpi.trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-400 mx-auto" /> : <Activity className="w-4 h-4 text-text-muted mx-auto" />}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {detailedMetrics.map((cat, ci) => (
              <motion.div key={cat.category} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + ci * 0.08 }} className="glass-panel rounded-2xl p-5 border border-white/10">
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">{cat.category}</h3>
                <div className="space-y-4">
                  {cat.metrics.map((m) => (
                    <div key={m.name} className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">{m.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{m.value}</span>
                        <span className={`text-xs font-semibold ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>{m.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Role-Based Dashboards */}
          <h2 className="text-xl font-bold mb-4">Executive Dashboards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {dashboards.map((db, i) => (
              <motion.div key={db.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all cursor-pointer group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${db.color} flex items-center justify-center mb-4 ${db.iconColor}`}>{db.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{db.name}</h3>
                <p className="text-xs text-text-secondary">{db.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
