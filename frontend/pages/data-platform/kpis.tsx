import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Target, Plus } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function KPIsPage() {
  const kpis = [
    { name: 'Monthly Active Users', current: '12,450', target: '15,000', unit: 'users', trend: 'up', progress: 83 },
    { name: 'Revenue MRR', current: '$284,500', target: '$350,000', unit: 'USD', trend: 'up', progress: 81 },
    { name: 'API Uptime', current: '99.97%', target: '99.99%', unit: '%', trend: 'flat', progress: 99.98 },
    { name: 'Avg Response Time', current: '142 ms', target: '100 ms', unit: 'ms', trend: 'down', progress: 70 },
    { name: 'Customer Satisfaction', current: '4.6/5', target: '4.8/5', unit: 'score', trend: 'up', progress: 96 },
    { name: 'Churn Rate', current: '2.3%', target: '1.5%', unit: '%', trend: 'down', progress: 65 },
    { name: 'Deployment Frequency', current: '12/day', target: '15/day', unit: 'deploys', trend: 'up', progress: 80 },
    { name: 'Error Budget Remaining', current: '67%', target: '100%', unit: '%', trend: 'down', progress: 67 },
    { name: 'Data Pipeline Health', current: '95.9%', target: '99%', unit: '%', trend: 'up', progress: 97 },
  ];

  const trendIcon = (t: string) => {
    if (t === 'up') return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (t === 'down') return <TrendingDown className="w-4 h-4 text-rose-400" />;
    return <Minus className="w-4 h-4 text-text-muted" />;
  };

  return (
    <>
      <Head>
        <title>KPI Monitoring | NexoApps Data Platform</title>
        <meta name="description" content="Real-time KPI tracking with trend analysis, targets, and performance indicators." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-bold">KPI Monitoring</h1>
              <p className="text-text-secondary mt-1">Real-time key performance indicators with trend analysis.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Add KPI
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {kpis.map((kpi, i) => (
              <motion.div key={kpi.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-text-secondary">{kpi.name}</h3>
                  {trendIcon(kpi.trend)}
                </div>
                <p className="text-3xl font-bold text-white mb-1">{kpi.current}</p>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-3 h-3 text-text-muted" />
                  <span className="text-xs text-text-muted">Target: {kpi.target}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-100 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(kpi.progress, 100)}%` }} transition={{ duration: 1, delay: i * 0.05 + 0.3 }} className={`h-full rounded-full ${kpi.progress >= 90 ? 'bg-gradient-to-r from-emerald-500 to-green-500' : kpi.progress >= 70 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' : 'bg-gradient-to-r from-rose-500 to-red-500'}`} />
                </div>
                <p className="text-[10px] text-text-muted text-right mt-1">{kpi.progress}% of target</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
