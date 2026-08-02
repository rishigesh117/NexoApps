import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/ai-platform/PlatformSidebar';
import { fetchApi } from '../../services/apiClient';
import { Deployment } from '../../types';
import { Rocket, CheckCircle2, Globe, Cpu } from 'lucide-react';

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);

  useEffect(() => {
    fetchApi<{ success: boolean; data: { deployments: Deployment[] } }>('/ai-deployments')
      .then((res) => setDeployments(res.data.deployments))
      .catch(() => setDeployments([]));
  }, []);

  return (
    <>
      <SEOHead
        title="AI Model Deployments Manager | NexoApps AI Platform"
        description="Monitor active inference cluster deployments, replica counts, and endpoint URLs."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Rocket className="w-6 h-6 text-emerald-400" /> Active AI Model Deployment Cluster
              </h1>
              <p className="text-xs text-text-secondary">
                Manage live inference endpoints, autoscaling replicas, and environment health.
              </p>
            </div>

            <div className="space-y-4">
              {deployments.map((d) => (
                <div key={d.id} className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-white text-base">{d.modelName}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {d.status}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-brand-cyan flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" /> {d.endpointUrl}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      Environment: <span className="text-white font-bold">{d.environment}</span> • Replicas: {d.replicas} Pods
                    </p>
                  </div>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all shrink-0"
                  >
                    Restart Deployment
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
