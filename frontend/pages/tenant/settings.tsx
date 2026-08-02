import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TenantSidebar } from '../../components/saas/TenantSidebar';
import { Sliders, Shield } from 'lucide-react';

export default function TenantSettingsPage() {
  return (
    <>
      <SEOHead
        title="Organization Settings | NexoApps SaaS Console"
        description="Configure tenant organization security, member roles, SSO integration, and MFA policies."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <TenantSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Sliders className="w-6 h-6 text-brand-violet" /> Organization & Tenant Security Settings
              </h1>
              <p className="text-xs text-text-secondary">
                Manage organization permissions, single sign-on (SSO), and member access policies.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Security & Access Controls
              </h3>
              <div className="space-y-3 text-xs text-text-secondary">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span>Enforce Multi-Factor Authentication (MFA) for All Members</span>
                  <input type="checkbox" defaultChecked className="accent-brand-cyan" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span>Allow Self-Service Member Invitations</span>
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
