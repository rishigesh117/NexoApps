import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TrendingCarousel } from '../components/community/TrendingCarousel';
import { ActivityFeed } from '../components/community/ActivityFeed';
import { RecommendationGrid } from '../components/community/RecommendationGrid';
import { communityService } from '../services/communityService';
import { TrendingMetric, CommunityFeedItem, RecommendationItem } from '../types';
import { Users, Sparkles, Flame, MessageSquare } from 'lucide-react';

export default function CommunityPage() {
  const [trending, setTrending] = useState<TrendingMetric[]>([]);
  const [feed, setFeed] = useState<CommunityFeedItem[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityData = async () => {
      setIsLoading(true);
      try {
        const [trData, feedData, recData] = await Promise.all([
          communityService.getTrending('today'),
          communityService.getCommunityFeed(),
          communityService.getRecommended(),
        ]);
        setTrending(trData || []);
        setFeed(feedData || []);
        setRecommendations(recData || []);
      } catch {
        // Fallback demo data
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunityData();
  }, []);

  return (
    <>
      <SEOHead
        title="Community & Social Discovery | NexoApps"
        description="Discover trending apps, developer updates, and community recommendations on NexoApps."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left">
          {/* Hero Banner */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl space-y-2">
            <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold uppercase tracking-wider">
              <Users className="w-4 h-4" /> NexoApps Ecosystem
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Community Hub & Social Discovery
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary max-w-2xl">
              Explore real-time developer updates, community milestones, trending app leaderboards, and personalized recommendation engines.
            </p>
          </div>

          {/* 1. Trending Leaderboard Carousel */}
          {trending.length > 0 && <TrendingCarousel metrics={trending} />}

          {/* 2. Grid: Community Activity Stream & AI Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {recommendations.length > 0 && <RecommendationGrid recommendations={recommendations} />}
            </div>

            <div className="lg:col-span-1">
              <ActivityFeed feed={feed} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
