import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { MainLayout } from '../layouts/MainLayout';
import { SEOHead } from '../components/SEOHead';
import { AppItem } from '../types';
import { getFeaturedApps } from '../services/appService';
import { AppGrid } from '../components/AppGrid';
import { Award, Sparkles } from 'lucide-react';

export default function FeaturedAppsPage() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFeaturedApps().then((data) => {
      setApps(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <SEOHead
        title="Featured Showcase | NexoApps Store"
        description="Explore handpicked featured applications, capstone projects, and flagship releases."
        canonicalUrl="https://nexoapps.com/featured"
      />

      <MainLayout>
        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Handpicked Showcase
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Applications
            </h1>
            <p className="text-xs sm:text-sm text-text-muted">
              Curated applications highlighted for exceptional quality, design, and performance.
            </p>
          </div>

          <AppGrid
            apps={apps}
            isLoading={isLoading}
            emptyTitle="No Featured Apps Found"
            emptySubtitle="Check back soon for new curated selections."
          />
        </div>
      </MainLayout>
    </>
  );
}
