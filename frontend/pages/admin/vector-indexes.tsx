import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Database, CheckCircle2 } from 'lucide-react';

export default function AdminVectorIndexesPage() {
  const indexes = [
    { name: 'idx_eng_vault_hnsw', type: 'HNSW', metric: 'Cosine', vectors: 42850, status: 'ready' },
  ];

  return (
    <>
      <Head>
        <title>Admin Vector Index Management | NexoApps Admin</title>
        <meta name="description" content="Admin console for HNSW vector indexes and embedding metrics." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              <h1 className="text-2xl font-display font-bold">Vector Database & Index Operations</h1>
              
              <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
                <h3 className="text-lg font-bold text-white">Active HNSW Vector Indexes</h3>
                <div className="space-y-3">
                  {indexes.map((idx) => (
                    <div key={idx.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Database className="w-4 h-4 text-brand-cyan" />
                        <div>
                          <h4 className="font-mono text-xs font-bold text-white">{idx.name}</h4>
                          <p className="text-[10px] text-text-muted font-mono mt-0.5">Type: {idx.type} • Metric: {idx.metric} • {idx.vectors} Vectors</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
