import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { MainLayout } from '../layouts/MainLayout';
import { SEOHead } from '../components/SEOHead';
import { AppItem } from '../types';
import { getNewApps } from '../services/appService';
import { AppGrid } from '../components/AppGrid';
import { Sparkles, Clock } from 'lucide-react';

export default function NewReleasesPage() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNewApps().then((data) => {
      setApps(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <SEOHead
        title="New Releases & Updates | NexoApps Store"
        description="Explore the latest application releases and recent platform updates."
        canonicalUrl="https://nexoapps.com/new"
      />

      <MainLayout>
        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Fresh Releases
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              New Releases & Updates
            </h1>
            <p className="text-xs sm:text-sm text-text-muted">
              Newly published applications, recent beta builds, and version updates.
            </p>
          </div>

          <AppGrid
            apps={apps}
            isLoading={isLoading}
            emptyTitle="No New Releases Found"
            emptySubtitle="Check back soon for new app additions."
          />
        </div>
      </MainLayout>
    </>
  );
}
