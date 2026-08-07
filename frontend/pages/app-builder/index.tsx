import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layout, Plus, Sparkles, Rocket, ArrowRight, Layers, Boxes, Server, Terminal } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { applicationBuilderService } from '../../services/applicationBuilderService';
import { AIApplication } from '../../../shared/types';

export default function AppBuilderPortalPage() {
  const [apps, setApps] = useState<AIApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await applicationBuilderService.listApplications();
      if (res.success) setApps(res.data);
    } catch (err) {
      console.error('Failed to load apps', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Application Builder & Low-Code Studio | NexoApps Version 6.1</title>
        <meta name="description" content="Visually compose, build, and deploy low-code AI applications." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              NexoApps Version 6.1 Release
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">
              Low-Code <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">AI Application Studio</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
              Visually build, customize, orchestrate workflows, and deploy enterprise AI applications without writing code.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between glass-panel p-6 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layout className="w-5 h-5 text-brand-cyan" />
              Your Low-Code AI Applications
            </h2>
            <Link
              href="/app-builder/studio"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create New App</span>
            </Link>
          </div>

          {/* App Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <div key={app.id} className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan uppercase">
                      {app.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      {app.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">{app.name}</h3>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed">{app.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-text-muted">v{app.version}</span>
                  <Link href={`/app-builder/studio?id=${app.id}`} className="text-xs font-bold text-brand-cyan flex items-center gap-1">
                    Open Studio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
