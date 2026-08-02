import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TenantSidebar } from '../../components/saas/TenantSidebar';
import { getSubscriptionPlans } from '../../services/saasSubscriptionService';
import { SubscriptionPlan } from '../../types';
import { Sparkles, Check, Rocket } from 'lucide-react';

export default function TenantSubscriptionPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    getSubscriptionPlans().then((data) => setPlans(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Subscription Tier Plans & Upgrades | NexoApps SaaS Console"
        description="Compare Free, Starter, Professional, and Enterprise SaaS plans and upgrade your tenant subscription."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <TenantSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-rose-400" /> Subscription Tier Plans & Upgrades
              </h1>
              <p className="text-xs text-text-secondary">
                Select the right tier for your organization scale, member seats, and edge GPU capacity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plans.map((p) => (
                <div key={p.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-white text-lg">{p.name}</h3>
                      <span className="text-2xl font-black text-emerald-400 font-mono">
                        ${p.priceMonthly.toFixed(0)}<span className="text-xs text-text-muted font-normal">/mo</span>
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs text-text-secondary">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Upgraded to ${p.name}!`)}
                    className="w-full py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
