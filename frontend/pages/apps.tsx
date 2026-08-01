import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { MainLayout } from '../layouts/MainLayout';
import { SEOHead } from '../components/SEOHead';
import { AppItem } from '../types';
import { getAppsCatalog } from '../services/appService';
import { AppGrid } from '../components/AppGrid';
import { StoreSidebar } from '../components/store/StoreSidebar';
import { Search, Sparkles, SlidersHorizontal, Layers } from 'lucide-react';

export default function StoreCatalogPage() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getAppsCatalog().then((data) => {
      setApps(data);
      setIsLoading(false);
    });
  }, []);

  // Filter & Sort Logic
  const filteredApps = useMemo(() => {
    let result = [...apps];

    // Search term filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.tagline.toLowerCase().includes(term) ||
          a.category.toLowerCase().includes(term) ||
          a.tags.some((t) => t.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Platform filter
    if (selectedPlatform !== 'All') {
      result = result.filter((a) => a.platform.includes(selectedPlatform as any));
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter((a) => a.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'most_downloaded':
        result.sort((a, b) => b.downloadsCount - a.downloadsCount);
        break;
      case 'highest_rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'recently_updated':
        result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
        break;
    }

    return result;
  }, [apps, searchTerm, selectedCategory, selectedPlatform, sortBy, minRating]);

  const handleResetAll = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedPlatform('All');
    setSortBy('newest');
    setMinRating(0);
  };

  return (
    <>
      <SEOHead
        title="App Store Catalog | NexoApps Platform"
        description="Browse and download high quality Android APKs, AI Applications, College Projects, and Developer Tools."
        canonicalUrl="https://nexoapps.com/apps"
      />

      <MainLayout>
        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          
          {/* Header Banner */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden space-y-4">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-cyan/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> App Marketplace
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Application Store
                </h1>
                <p className="text-xs sm:text-sm text-text-muted max-w-lg">
                  Explore curated Android APKs, AI Agents, Web Utilities, and Open-Source Projects.
                </p>
              </div>

              {/* Instant Search Bar */}
              <div className="w-full md:w-80 relative">
                <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-surface-100/90 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan transition-colors shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Main Layout: Sidebar + Grid */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            <StoreSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedPlatform={selectedPlatform}
              onSelectPlatform={setSelectedPlatform}
              sortBy={sortBy}
              onSelectSortBy={setSortBy}
              minRating={minRating}
              onSelectMinRating={setMinRating}
              onResetAll={handleResetAll}
            />

            <div className="flex-1 min-w-0 space-y-4">
              <div className="flex items-center justify-between text-xs text-text-muted px-1">
                <span>
                  Showing <strong className="text-white">{filteredApps.length}</strong> applications
                </span>
                {selectedCategory !== 'All' && (
                  <span className="text-brand-cyan font-semibold">Category: {selectedCategory}</span>
                )}
              </div>

              <AppGrid
                apps={filteredApps}
                isLoading={isLoading}
                onResetFilters={handleResetAll}
              />
            </div>

          </div>

        </div>
      </MainLayout>
    </>
  );
}
