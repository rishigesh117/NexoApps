import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { DeveloperApiSidebar } from '../../components/integrations/DeveloperApiSidebar';
import { getIntegrationProviders } from '../../services/integrationService';
import { IntegrationLog } from '../../types';
import { Activity, CheckCircle2 } from 'lucide-react';

export default function IntegrationLogsPage() {
  const [logs, setLogs] = useState<IntegrationLog[]>([]);

  useEffect(() => {
    getIntegrationProviders().then((res) => setLogs(res.logs)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Integration Event Audit Logs | NexoApps"
        description="Inspect integration execution logs, sync events, and automated webhook retries."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <DeveloperApiSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-amber-400" /> Integration Execution Audit Logs
              </h1>
              <p className="text-xs text-text-secondary">
                Live stream of OAuth token refresh events, webhook dispatches, and third-party syncs.
              </p>
            </div>

            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan">
                        {log.action}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {log.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">{log.details}</p>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">{new Date(log.timestamp).toLocaleTimeString()}</span>
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
