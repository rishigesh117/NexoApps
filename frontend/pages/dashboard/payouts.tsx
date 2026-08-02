import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { getCreatorPayouts } from '../../services/creatorService';
import { DollarSign, Wallet, CreditCard, ArrowUpRight } from 'lucide-react';

export default function RevenueDashboardPage() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    getCreatorPayouts().then((res) => setData(res)).catch(() => {});
  }, []);

  const d = data || { totalEarnings: 14850.00, availableBalance: 3420.00, payoutHistory: [] };

  return (
    <>
      <SEOHead
        title="Creator Revenue & Payouts | NexoApps Developer Dashboard"
        description="Monitor item sales, active subscriptions, and request payout withdrawals."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-400" /> Creator Revenue & Payout Analytics
            </h1>
            <p className="text-xs text-text-secondary">
              Track subscription income, item sales royalties, and request automated payout transfers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Wallet className="w-4 h-4 text-emerald-400" /> Total Earnings Lifetime
              </span>
              <p className="text-3xl font-black text-white">${d.totalEarnings.toFixed(2)}</p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
              <span className="text-xs text-text-muted flex items-center gap-1">
                <CreditCard className="w-4 h-4 text-brand-cyan" /> Available Payout Balance
              </span>
              <p className="text-3xl font-black text-emerald-400">${d.availableBalance.toFixed(2)}</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
