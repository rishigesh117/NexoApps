import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { SplashScreen } from '../components/SplashScreen';
import { MainLayout } from '../layouts/MainLayout';
import { Hero } from '../components/Hero';
import { BatlyticsFeaturedShowcase } from '../components/BatlyticsFeaturedShowcase';
import { AppCard } from '../components/AppCard';
import { CategoryFilterBar } from '../components/CategoryFilterBar';
import { PopularCategories } from '../components/PopularCategories';
import { LatestUpdates } from '../components/LatestUpdates';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PlatformMetrics } from '../components/PlatformMetrics';
import { Testimonials } from '../components/Testimonials';
import { Newsletter } from '../components/Newsletter';
import { ContactTeaser } from '../components/ContactTeaser';
import { TrendingCarousel } from '../components/community/TrendingCarousel';
import { AIInsightsCard } from '../components/ai/AIInsightsCard';
import { INITIAL_APPS_CATALOG, FEATURED_BATLYTICS_APP } from '../services/appService';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredApps = INITIAL_APPS_CATALOG.filter((app) => {
    if (selectedCategory === 'All') return true;
    return app.category === selectedCategory;
  });

  return (
    <>
      <SEOHead
        title="NexoApps | Discover Amazing Apps - Personal Software Ecosystem"
        description="Discover Amazing Apps. One platform for all my Android, AI, Web and Desktop applications. Featuring Batlytics Cricket Scoring App."
        canonicalUrl="https://nexoapps.com"
      />

      {/* Loading Splash Screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <MainLayout>
        {/* 1. Hero Section */}
        <Hero />

        {/* AI Intelligence Insight */}
        <AIInsightsCard />

        {/* 2. Featured App: Batlytics */}
        <BatlyticsFeaturedShowcase app={FEATURED_BATLYTICS_APP} />

        {/* Trending Apps Leaderboard */}
        <div className="py-6">
          <TrendingCarousel
            metrics={INITIAL_APPS_CATALOG.map((app, i) => ({
              appId: app.id,
              app,
              downloads: 142000 - i * 12000,
              favorites: 1200 - i * 80,
              reviews: 342 - i * 30,
              rating: 4.9,
              views: 210000,
              trendingScore: 990 - i * 40,
              period: 'today',
            }))}
          />
        </div>

        {/* 3. Latest Apps Grid */}
        <section id="categories" className="py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-1 block">
                Catalog & Releases
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Latest Applications
              </h2>
            </div>
            <p className="text-xs text-text-muted max-w-md">
              Filter by platform domain. Designed to seamlessly support hundreds of applications.
            </p>
          </div>

          {/* Category Filter Pills */}
          <CategoryFilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Apps Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>

          {filteredApps.length === 0 && (
            <div className="py-16 text-center glass-card rounded-3xl border border-white/10 my-6">
              <p className="text-sm font-semibold text-text-secondary">No applications currently listed under this category.</p>
              <p className="text-xs text-text-muted mt-1">Check back soon for new project uploads!</p>
            </div>
          )}
        </section>

        {/* 4. Popular Categories */}
        <PopularCategories />

        {/* Latest Release Updates Section */}
        <LatestUpdates />

        {/* 5. Why Choose NexoApps */}
        <WhyChooseUs />

        {/* 6. Platform Statistics Counters */}
        <PlatformMetrics />

        {/* 7. Testimonials */}
        <Testimonials />

        {/* 8. Newsletter */}
        <Newsletter />

        {/* Suggestions & Feedback Teaser */}
        <ContactTeaser />
      </MainLayout>
    </>
  );
}
