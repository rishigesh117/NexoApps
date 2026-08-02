import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TenantSidebar } from '../../components/saas/TenantSidebar';
import { getBillingOverview } from '../../services/billingService';
import { CreditCard, HardDrive, Zap, CheckCircle2 } from 'lucide-react';

export default function TenantBillingPage() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    getBillingOverview().then((res) => setData(res)).catch(() => {});
  }, []);

  const b = data?.overview || { currentPlan: 'PROFESSIONAL', priceMonthly: 99.00, usage: { storageUsedGb: 12.4, storageLimitGb: 50, apiRequestsMonth: 48200, apiRequestsLimit: 100000 } };

  return (
    <>
      <SEOHead
        title="Subscription & Billing Hub | NexoApps SaaS Console"
        description="Monitor tenant storage usage, API request metering, and active payment cards."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <TenantSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-emerald-400" /> Subscription & Usage Billing Hub
              </h1>
              <p className="text-xs text-text-secondary">
                Track active subscription tier, storage allocation, API request limits, and billing dates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-text-muted text-xs">
                  <span>Storage Allocation</span>
                  <HardDrive className="w-4 h-4 text-brand-cyan" />
                </div>
                <p className="text-2xl font-black text-white">{b.usage.storageUsedGb} GB / {b.usage.storageLimitGb} GB</p>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-cyan h-full rounded-full" style={{ width: `${(b.usage.storageUsedGb / b.usage.storageLimitGb) * 100}%` }} />
                </div>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-text-muted text-xs">
                  <span>Monthly API Metering</span>
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-black text-white">{b.usage.apiRequestsMonth.toLocaleString()} Req</p>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(b.usage.apiRequestsMonth / b.usage.apiRequestsLimit) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
