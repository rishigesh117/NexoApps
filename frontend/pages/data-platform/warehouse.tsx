import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Server, HardDrive, Camera, Database } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function WarehousePage() {
  const tables = [
    { name: 'fact_user_sessions', rows: '2.46M', size: '500 MB', updated: '2 min ago' },
    { name: 'fact_api_calls', rows: '8.74M', size: '1.0 GB', updated: '5 min ago' },
    { name: 'dim_users', rows: '34.5K', size: '8 MB', updated: '12 min ago' },
    { name: 'fact_revenue', rows: '125.6K', size: '32 MB', updated: '1 hr ago' },
    { name: 'fact_deployments', rows: '89.2K', size: '18 MB', updated: '30 min ago' },
    { name: 'dim_plans', rows: '12', size: '4 KB', updated: '1 day ago' },
  ];

  return (
    <>
      <Head>
        <title>Data Warehouse | NexoApps Data Platform</title>
        <meta name="description" content="Browse warehouse tables, manage snapshots, and monitor data lake storage utilization." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-bold">Data Warehouse</h1>
              <p className="text-text-secondary mt-1">Columnar storage tables, snapshots, and data lake utilization.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="glass-panel rounded-xl px-4 py-2 border border-white/10 text-center">
                <p className="text-lg font-bold text-violet-400">14.8 GB</p>
                <p className="text-[10px] text-text-muted uppercase">Total Size</p>
              </div>
              <div className="glass-panel rounded-xl px-4 py-2 border border-white/10 text-center">
                <p className="text-lg font-bold text-blue-400">6</p>
                <p className="text-[10px] text-text-muted uppercase">Tables</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-surface-100 border-b border-white/10 text-xs font-bold text-text-muted uppercase tracking-wider">
              <div className="col-span-4">Table Name</div>
              <div className="col-span-2 text-right">Row Count</div>
              <div className="col-span-2 text-right">Size</div>
              <div className="col-span-2 text-right">Last Updated</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {tables.map((tbl, i) => (
              <motion.div key={tbl.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center">
                <div className="col-span-4 flex items-center gap-3">
                  <Database className="w-4 h-4 text-violet-400" />
                  <span className="font-mono text-sm font-semibold text-white">{tbl.name}</span>
                </div>
                <div className="col-span-2 text-right text-sm text-text-secondary">{tbl.rows}</div>
                <div className="col-span-2 text-right text-sm text-text-secondary">{tbl.size}</div>
                <div className="col-span-2 text-right text-xs text-text-muted">{tbl.updated}</div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-xs font-semibold transition-colors">
                    <Camera className="w-3 h-3" /> Snapshot
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
