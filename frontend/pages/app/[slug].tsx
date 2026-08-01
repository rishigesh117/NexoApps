import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MainLayout } from '../../layouts/MainLayout';
import { SEOHead } from '../../components/SEOHead';
import { useAuth } from '../../context/AuthContext';
import { AppItem } from '../../types';
import {
  getAppBySlug,
  getRelatedApps,
  getChangelog,
  FEATURED_BATLYTICS_APP,
} from '../../services/appService';

import { AppDetailsHeader } from '../../components/app-details/AppDetailsHeader';
import { ScreenshotGallery } from '../../components/app-details/ScreenshotGallery';
import { RatingsSummary } from '../../components/app-details/RatingsSummary';
import { VersionHistoryTab } from '../../components/app-details/VersionHistoryTab';
import { AppReviewsSection } from '../../components/reviews/AppReviewsSection';
import { SystemRequirementsCard } from '../../components/app-details/SystemRequirementsCard';
import { DeveloperSection } from '../../components/app-details/DeveloperSection';
import { DownloadPanel } from '../../components/app-details/DownloadPanel';
import { ReportAppModal } from '../../components/app-details/ReportAppModal';
import { SignupModal } from '../../components/SignupModal';
import { RecommendationGrid } from '../../components/community/RecommendationGrid';
import { DeveloperFollowButton } from '../../components/community/DeveloperFollowButton';
import { ArrowLeft, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function DynamicAppDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { isAuthenticated } = useAuth();

  const [app, setApp] = useState<AppItem>(FEATURED_BATLYTICS_APP);
  const [relatedApps, setRelatedApps] = useState<AppItem[]>([]);
  const [changelog, setChangelog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const currentPath = `/app/${slug || 'batlytics-cricket-scoring'}`;

  useEffect(() => {
    if (!router.isReady) return;
    const appSlug = (slug as string) || 'batlytics-cricket-scoring';
    
    setIsLoading(true);
    Promise.all([
      getAppBySlug(appSlug),
      getRelatedApps(appSlug),
      getChangelog(appSlug),
    ]).then(([fetchedApp, fetchedRelated, fetchedChangelog]) => {
      if (fetchedApp) {
        setApp(fetchedApp);
      }
      setRelatedApps(fetchedRelated);
      setChangelog(fetchedChangelog);
      setIsLoading(false);
    });
  }, [router.isReady, slug]);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIsSignupModalOpen(true);
    } else {
      router.push(`/download/${app.slug}`);
    }
  };

  // Structured Data JSON-LD Schema
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.title,
    operatingSystem: app.minAndroidVersion || 'Android 8.0+',
    applicationCategory: app.category,
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: app.rating,
      reviewCount: app.totalReviews,
    },
  };

  return (
    <>
      <SEOHead
        title={`${app.title} - ${app.tagline} | NexoApps`}
        description={app.description}
        canonicalUrl={`https://nexoapps.com/app/${app.slug}`}
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </Head>

      <MainLayout>
        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          
          {/* Back to Apps Nav Link */}
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-cyan hover:underline transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store Catalog
          </Link>

          {/* Hero Details Header */}
          <AppDetailsHeader
            app={app}
            onDownloadClick={handleDownloadClick}
            onReportClick={() => setIsReportModalOpen(true)}
          />

          {/* Main Grid Layout: Left Content + Right Floating Download Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* 1. Screenshots & Preview Gallery */}
              <ScreenshotGallery app={app} />

              {/* 2. About & Features Cards */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-white">About {app.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                    {app.description}
                  </p>
                </div>

                {app.features && app.features.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Key Highlights & Capabilities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {app.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-surface-100/80 border border-white/10 flex items-center gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                          <span className="text-xs text-white font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Version History */}
              <VersionHistoryTab app={app} changelog={changelog} />

              {/* 4. Ratings & Reviews System */}
              <AppReviewsSection
                app={app}
                onAuthRequired={() => setIsSignupModalOpen(true)}
              />

              {/* 5. System Requirements */}
              <SystemRequirementsCard app={app} />

              {/* 6. Developer Section */}
              <DeveloperSection app={app} relatedApps={relatedApps} />

              {/* 7. Phase 4D Recommendations & Social Discovery */}
              <div className="pt-4 space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                  <span className="font-bold text-white">Developer Studio Updates & Following</span>
                  <DeveloperFollowButton developerId={app.developer?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'batlytics'} />
                </div>

                <RecommendationGrid recommendations={relatedApps.map((r, i) => ({ app: r, reason: 'Similar Category & High Rating', score: 95 - i * 3 }))} />
              </div>

            </div>

            {/* Right Sidebar Download Panel */}
            <div className="space-y-6">
              <DownloadPanel app={app} onDownloadClick={handleDownloadClick} />
            </div>

          </div>

        </div>

        {/* Guest Signup Prompt Modal */}
        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
          returnUrl={currentPath}
        />

        {/* Report App Modal */}
        <ReportAppModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          appTitle={app.title}
        />

      </MainLayout>
    </>
  );
}
