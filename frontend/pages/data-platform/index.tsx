import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Database, GitBranch, BarChart3, TrendingUp, Server, Shield, Activity, Layers, ArrowRight, Zap } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function DataPlatformPage() {
  const platformModules = [
    { icon: <Database className="w-6 h-6" />, title: 'Data Lake', description: 'Centralized data lake with schema-on-read and multi-source ingestion', href: '/data-platform/sources', color: 'from-blue-500 to-cyan-500', stats: '6 Sources' },
    { icon: <GitBranch className="w-6 h-6" />, title: 'ETL Pipelines', description: 'Automated extract, transform, load pipelines with scheduling', href: '/data-platform/etl', color: 'from-emerald-500 to-teal-500', stats: '4 Active' },
    { icon: <Server className="w-6 h-6" />, title: 'Data Warehouse', description: 'Columnar warehouse tables with snapshots and versioning', href: '/data-platform/warehouse', color: 'from-violet-500 to-purple-500', stats: '14.8 GB' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Reports & BI', description: 'Custom report builder with scheduled exports and sharing', href: '/data-platform/reports', color: 'from-amber-500 to-orange-500', stats: '23 Reports' },
    { icon: <Layers className="w-6 h-6" />, title: 'Dashboard Builder', description: 'Drag-and-drop dashboard builder with widget library', href: '/data-platform/dashboards', color: 'from-rose-500 to-pink-500', stats: '3 Dashboards' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'KPI Monitoring', description: 'Real-time KPI tracking with trend analysis and alerting', href: '/data-platform/kpis', color: 'from-cyan-500 to-blue-500', stats: '12 KPIs' },
    { icon: <Zap className="w-6 h-6" />, title: 'AI Analytics', description: 'Machine learning models for churn prediction and forecasting', href: '/data-platform/ai-analytics', color: 'from-indigo-500 to-violet-500', stats: '3 Models' },
    { icon: <Activity className="w-6 h-6" />, title: 'Predictive Analytics', description: 'Prediction jobs with confidence scoring and audit reports', href: '/data-platform/predictions', color: 'from-teal-500 to-emerald-500', stats: '3 Jobs' },
    { icon: <Shield className="w-6 h-6" />, title: 'Data Quality', description: 'Automated data quality checks, validation, and health scoring', href: '/data-platform/quality', color: 'from-green-500 to-emerald-500', stats: '95.9%' },
  ];

  return (
    <>
      <Head>
        <title>Enterprise Data Platform | NexoApps</title>
        <meta name="description" content="Centralized Data Lake, ETL Pipelines, Business Intelligence, KPI Monitoring, and AI Analytics." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-6">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Enterprise Data Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Unified Data Intelligence</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Ingest, transform, analyze, and visualize your enterprise data with AI-powered insights, real-time KPIs, and predictive analytics.
            </p>
          </motion.div>

          {/* Summary Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Data Sources', value: '6', color: 'text-blue-400' },
              { label: 'Warehouse Size', value: '14.8 GB', color: 'text-emerald-400' },
              { label: 'Active KPIs', value: '12', color: 'text-amber-400' },
              { label: 'Data Quality', value: '95.9%', color: 'text-green-400' },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel rounded-2xl p-5 border border-white/10 text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformModules.map((mod, i) => (
              <motion.a
                key={mod.title}
                href={mod.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="group glass-panel rounded-2xl p-6 border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:shadow-glow-cyan"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} p-0.5`}>
                    <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center text-white">
                      {mod.icon}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-muted bg-surface-100 px-3 py-1 rounded-full">{mod.stats}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{mod.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{mod.description}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Open Module</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
