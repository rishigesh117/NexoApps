import React from 'react';
import Head from 'next/head';
import { Settings, Shield, Cpu } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { UniversalSidebar } from '../../components/ai-os/UniversalSidebar';

export default function WorkspaceSettingsPage() {
  return (
    <>
      <Head>
        <title>Workspace Settings | NexoApps AI OS</title>
        <meta name="description" content="AI OS Unified Workspace Settings & Preferences." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <UniversalSidebar />
            <div className="flex-1 min-w-0 space-y-6">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-brand-cyan" />
                  AI OS Workspace Preferences & System Layout
                </h3>
                <div className="space-y-3 text-xs text-text-secondary">
                  <p>Workspace Name: <span className="text-white font-bold">Enterprise AI OS Unified Command Hub</span></p>
                  <p>Active Theme: <span className="text-brand-cyan font-bold font-mono">Dark Glassmorphic Theme</span></p>
                  <p>Cross-Module Interoperability: <span className="text-emerald-400 font-bold">ENABLED</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
