import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { RecommendationGrid } from '../components/community/RecommendationGrid';
import { communityService } from '../services/communityService';
import { RecommendationItem } from '../types';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function RecommendedPage() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      setIsLoading(true);
      try {
        const data = await communityService.getRecommended();
        setRecommendations(data || []);
      } catch {
        setRecommendations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecs();
  }, []);

  return (
    <>
      <SEOHead
        title="Personalized Recommendations | NexoApps"
        description="Handpicked app recommendations tailored to your category preferences and download history."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-brand-cyan" /> Personalized App Recommendations
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Driven by your wishlist, category preferences, developer following, and store interactions.
              </p>
            </div>
          </div>

          <RecommendationGrid recommendations={recommendations} />
        </main>

        <Footer />
      </div>
    </>
  );
}
