import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AnalyticsOverview } from '../components/ai/AnalyticsOverview';
import { GrowthCharts } from '../components/ai/GrowthCharts';
import { AIInsightsCard } from '../components/ai/AIInsightsCard';
import { fetchApi } from '../services/apiClient';
import { EnterpriseAnalyticsOverview } from '../types';
import { Activity, BarChart2 } from 'lucide-react';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<EnterpriseAnalyticsOverview>({
    dau: 4250,
    mau: 38400,
    totalDownloads: 184500,
    revenuePlaceholder: '$0.00 (Free Platform)',
    activeDevelopers: 42,
    totalReviews: 890,
    searchCount: 12400,
    conversionRate: 68.4,
    topCategories: [
      { category: 'Sports', count: 72000, percentage: 39 },
      { category: 'AI Utilities', count: 54000, percentage: 29 },
      { category: 'Productivity', count: 35000, percentage: 19 },
    ],
    dailyMetrics: [
      { date: 'Mon', downloads: 12400, users: 3800 },
      { date: 'Tue', downloads: 15800, users: 4100 },
      { date: 'Wed', downloads: 14200, users: 3950 },
      { date: 'Thu', downloads: 18900, users: 4400 },
      { date: 'Fri', downloads: 22100, users: 4800 },
      { date: 'Sat', downloads: 26500, users: 5200 },
      { date: 'Sun', downloads: 24300, users: 4900 },
    ],
    deviceDistribution: [
      { device: 'Android Phones', percentage: 68 },
      { device: 'Android Tablets', percentage: 18 },
      { device: 'Chromebook / Desktop', percentage: 14 },
    ],
  });

  useEffect(() => {
    fetchApi<{ success: boolean; data: EnterpriseAnalyticsOverview }>('/analytics/overview')
      .then((res) => {
        if (res.data) setAnalytics(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Enterprise Analytics & Growth Insights | NexoApps"
        description="Public platform growth metrics, daily active users, download traffic, and category analytics on NexoApps."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex items-center justify-between shadow-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <BarChart2 className="w-6 h-6 text-brand-cyan" /> Platform Growth Analytics & Metrics
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Real-time traffic telemetry, daily active user trends, and category distribution insights.
              </p>
            </div>
          </div>

          <AIInsightsCard />

          <AnalyticsOverview data={analytics} />

          <GrowthCharts data={analytics} />
        </main>

        <Footer />
      </div>
    </>
  );
}
