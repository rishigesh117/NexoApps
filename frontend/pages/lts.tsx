import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, CheckCircle2, Cpu, Database, Globe, Layers, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { LTSStatusBadge } from '../components/lts/LTSStatusBadge';
import { SecurityHardeningCard } from '../components/lts/SecurityHardeningCard';
import { PerformanceMonitorCard } from '../components/lts/PerformanceMonitorCard';

export default function LTSReleasePage() {
  const releaseHighlights = [
    { title: 'Full-Stack Enterprise Architecture', description: 'Unified OS, AI Builder, AI Agents, AI Platform, SaaS Multi-Tenancy, Integrations, Data Lake, and AI Cloud.' },
    { title: 'Zero-Downtime Reliability & LTS Support', description: 'Long-Term Support version guaranteed with backwards compatibility across all Phase 1A–7D APIs.' },
    { title: 'OWASP Top 10 Security Hardening', description: 'Enforced RBAC, JWT RSA-256 tokens, encrypted secrets vault, CSP security headers, and rate limiting.' },
    { title: 'High-Performance Engine', description: 'Optimized database indexes, sub-50ms average API response times, and lightweight bundle footprint.' },
  ];

  return (
    <>
      <Head>
        <title>NexoApps Version 4.0 LTS — Official Long-Term Support Release</title>
        <meta name="description" content="NexoApps Version 4.0 LTS Official Release. Enterprise platform, OWASP security hardening, and performance telemetry." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <LTSStatusBadge version="4.0.0-LTS" isLTS={true} />
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">
              NexoApps <span className="bg-gradient-to-r from-emerald-400 via-brand-cyan to-brand-violet bg-clip-text text-transparent">Version 4.0 LTS</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
              The official Enterprise Platform Long-Term Support release. Production-ready, fully unified, OWASP security-hardened, and performance-optimized.
            </p>
          </motion.div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {releaseHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2 hover:border-emerald-500/40 transition-all"
              >
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{item.title}</span>
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed pl-7">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Security & Performance */}
          <SecurityHardeningCard />
          <PerformanceMonitorCard />

        </div>
      </main>
    </>
  );
}
