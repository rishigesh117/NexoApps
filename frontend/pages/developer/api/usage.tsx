import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../../components/SEOHead';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { DeveloperApiSidebar } from '../../../components/integrations/DeveloperApiSidebar';
import { getGatewayStatus } from '../../../services/apiGatewayService';
import { ApiRateLimit } from '../../../types';
import { BarChart3, ShieldCheck } from 'lucide-react';

export default function DeveloperApiUsagePage() {
  const [data, setData] = useState<{ status: any; rateLimits: ApiRateLimit[] } | null>(null);

  useEffect(() => {
    getGatewayStatus().then((res) => setData(res)).catch(() => {});
  }, []);

  const limits = data?.rateLimits || [];

  return (
    <>
      <SEOHead
        title="API Rate Limits & Usage Metering | NexoApps Developer Portal"
        description="Monitor token bucket rate limits, burst quotas, and hourly request distribution."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <DeveloperApiSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-amber-400" /> API Rate Limits & Token Bucket Metering
              </h1>
              <p className="text-xs text-text-secondary">
                Rate limiting quotas enforced per tier across API Gateway endpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {limits.map((l) => (
                <div key={l.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2 shadow-2xl">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan">
                    {l.tierName} TIER
                  </span>
                  <h4 className="font-extrabold text-white text-lg">{l.requestsPerMinute} Req/min</h4>
                  <p className="text-xs text-text-muted">{l.requestsPerDay.toLocaleString()} Daily Limit</p>
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
