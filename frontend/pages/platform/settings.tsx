import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/platform/PlatformSidebar';
import { Sliders, Shield, Bell } from 'lucide-react';

export default function UnifiedPlatformSettingsPage() {
  return (
    <>
      <SEOHead
        title="Unified Platform Settings | NexoApps AI OS"
        description="Global platform OS preferences, notification channels, theme customization, and API integration settings."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Sliders className="w-6 h-6 text-brand-violet" /> Unified Platform OS Preferences & Settings
              </h1>
              <p className="text-xs text-text-secondary">
                Configure global shortcuts, notification channels, compact dashboard mode, and security keys.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-brand-cyan" /> Global Notification Delivery Channels
              </h3>
              <div className="space-y-3 text-xs text-text-secondary">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span>Receive Email Alerts for Model Deployments</span>
                  <input type="checkbox" defaultChecked className="accent-brand-cyan" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span>Notify on AI Marketplace Sales & Subscriptions</span>
                  <input type="checkbox" defaultChecked className="accent-brand-cyan" />
                </label>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
