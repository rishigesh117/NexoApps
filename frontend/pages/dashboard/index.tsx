import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/platform/PlatformSidebar';
import { CommandPalette } from '../../components/platform/CommandPalette';
import { PlatformHealthPanel } from '../../components/platform/PlatformHealthPanel';
import { getDashboardData } from '../../services/dashboardService';
import { getPlatformHealth } from '../../services/platformService';
import { PlatformHealth } from '../../types';
import { LayoutDashboard, ArrowUpRight, Sparkles, Command, Cpu, Bot, Store, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function UnifiedDashboardPage() {
  const [data, setData] = useState<any | null>(null);
  const [health, setHealth] = useState<PlatformHealth | undefined>(undefined);

  useEffect(() => {
    getDashboardData().then((res) => setData(res)).catch(() => {});
    getPlatformHealth().then((h) => setHealth(h)).catch(() => {});
  }, []);

  const d = data || { metrics: {}, continueWorking: [], widgets: [] };

  return (
    <>
      <SEOHead
        title="Unified AI Operating System Dashboard | NexoApps"
        description="Centralized AI OS dashboard orchestrating AI Builder, Autonomous Agents, Model Deployments, and Marketplace."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />
        <CommandPalette />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6 text-brand-cyan" /> Unified AI Operating System (v2.5)
                  </h1>
                  <p className="text-xs text-text-secondary pt-1">
                    Centralized platform orchestrator linking AI Builder, Agents, Deployments, and Marketplace.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs text-brand-cyan font-mono flex items-center gap-1.5 shrink-0">
                  <Command className="w-4 h-4" /> Press <kbd className="font-bold text-white">Ctrl + K</kbd>
                </div>
              </div>
            </div>

            <PlatformHealthPanel health={health} />

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-cyan" /> Continue Working & Recent Workspaces
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {d.continueWorking.map((item: any) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-cyan/40 transition-all space-y-2 block"
                  >
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-cyan/20 text-brand-cyan">
                      {item.module}
                    </span>
                    <h4 className="font-bold text-white text-xs line-clamp-1">{item.title}</h4>
                    <span className="text-[10px] text-brand-cyan flex items-center gap-1 font-bold pt-1">
                      Resume Workspace <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/builder" className="glass-panel p-5 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all space-y-2 block">
                <div className="flex items-center justify-between text-brand-cyan">
                  <span className="font-bold text-xs">AI Builder</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <p className="text-xs text-text-secondary">Scaffold components & codebases</p>
              </Link>

              <Link href="/agents" className="glass-panel p-5 rounded-3xl border border-white/10 hover:border-brand-violet/40 transition-all space-y-2 block">
                <div className="flex items-center justify-between text-brand-violet">
                  <span className="font-bold text-xs">AI Agents</span>
                  <Bot className="w-4 h-4" />
                </div>
                <p className="text-xs text-text-secondary">Multi-agent developer swarm</p>
              </Link>

              <Link href="/ai-platform" className="glass-panel p-5 rounded-3xl border border-white/10 hover:border-emerald-400/40 transition-all space-y-2 block">
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="font-bold text-xs">AI Platform</span>
                  <Rocket className="w-4 h-4" />
                </div>
                <p className="text-xs text-text-secondary">Deploy models & edge inference</p>
              </Link>

              <Link href="/marketplace" className="glass-panel p-5 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all space-y-2 block">
                <div className="flex items-center justify-between text-amber-400">
                  <span className="font-bold text-xs">AI Marketplace</span>
                  <Store className="w-4 h-4" />
                </div>
                <p className="text-xs text-text-secondary">Monetize agents & assets</p>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
