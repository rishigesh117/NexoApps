import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Database, Plus, RefreshCw, CheckCircle, AlertTriangle, Wifi } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function DataSourcesPage() {
  const sources = [
    { id: '1', name: 'Production PostgreSQL', sourceType: 'postgresql', status: 'active', lastSyncedAt: '2 min ago', icon: <Database className="w-5 h-5" />, color: 'text-blue-400' },
    { id: '2', name: 'Stripe Billing API', sourceType: 'rest_api', status: 'active', lastSyncedAt: '5 min ago', icon: <Wifi className="w-5 h-5" />, color: 'text-emerald-400' },
    { id: '3', name: 'Google Analytics', sourceType: 'rest_api', status: 'active', lastSyncedAt: '30 min ago', icon: <Wifi className="w-5 h-5" />, color: 'text-amber-400' },
    { id: '4', name: 'MongoDB Atlas', sourceType: 'mongodb', status: 'active', lastSyncedAt: '12 min ago', icon: <Database className="w-5 h-5" />, color: 'text-green-400' },
    { id: '5', name: 'AWS S3 Data Lake', sourceType: 's3', status: 'active', lastSyncedAt: '1 hr ago', icon: <Database className="w-5 h-5" />, color: 'text-violet-400' },
    { id: '6', name: 'Salesforce CRM', sourceType: 'rest_api', status: 'warning', lastSyncedAt: '3 hr ago', icon: <Wifi className="w-5 h-5" />, color: 'text-rose-400' },
  ];

  return (
    <>
      <Head>
        <title>Data Sources & Connectors | NexoApps Data Platform</title>
        <meta name="description" content="Manage data source connections, connectors, and sync schedules for your enterprise data lake." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-bold">Data Sources & Connectors</h1>
              <p className="text-text-secondary mt-1">Manage connections to databases, APIs, and external data providers.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold shadow-glow-cyan hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Add Source
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sources.map((src, i) => (
              <motion.div key={src.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center ${src.color}`}>{src.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate">{src.name}</h3>
                    <p className="text-xs text-text-muted uppercase tracking-wider">{src.sourceType}</p>
                  </div>
                  {src.status === 'active' ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
                </div>
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>Last synced: {src.lastSyncedAt}</span>
                  <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                    <RefreshCw className="w-3 h-3" /> Sync
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
