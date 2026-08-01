import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { MainLayout } from '../../layouts/MainLayout';
import { SEOHead } from '../../components/SEOHead';
import { AppItem } from '../../types';
import { getAppsCatalog } from '../../services/appService';
import { AppGrid } from '../../components/AppGrid';
import { Layers, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CategoryStorePage() {
  const router = useRouter();
  const { category } = router.query;

  const [apps, setApps] = useState<AppItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formattedCategoryName = useMemo(() => {
    if (!category || typeof category !== 'string') return 'Category Catalog';
    return category
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }, [category]);

  useEffect(() => {
    if (!router.isReady) return;
    setIsLoading(true);
    getAppsCatalog().then((allApps) => {
      if (category && typeof category === 'string') {
        const cleanCat = category.replace(/-/g, ' ').toLowerCase();
        const filtered = allApps.filter(
          (app) => app.category.toLowerCase() === cleanCat || app.category.toLowerCase().replace(/ /g, '-') === category.toLowerCase()
        );
        setApps(filtered);
      } else {
        setApps(allApps);
      }
      setIsLoading(false);
    });
  }, [router.isReady, category]);

  return (
    <>
      <SEOHead
        title={`${formattedCategoryName} | NexoApps Store`}
        description={`Explore applications and tools under ${formattedCategoryName} category.`}
        canonicalUrl={`https://nexoapps.com/category/${category}`}
      />

      <MainLayout>
        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          
          {/* Header Banner */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden space-y-4">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-cyan/15 rounded-full blur-[100px] pointer-events-none" />

            <Link
              href="/apps"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store Catalog
            </Link>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Category Showcase
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {formattedCategoryName}
              </h1>
              <p className="text-xs sm:text-sm text-text-muted">
                Showing {apps.length} applications in this category
              </p>
            </div>
          </div>

          <AppGrid
            apps={apps}
            isLoading={isLoading}
            emptyTitle={`No Apps in ${formattedCategoryName}`}
            emptySubtitle="Check back soon for new additions in this category."
          />

        </div>
      </MainLayout>
    </>
  );
}
