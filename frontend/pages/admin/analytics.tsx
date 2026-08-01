import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AnalyticsOverview } from '../../components/ai/AnalyticsOverview';
import { GrowthCharts } from '../../components/ai/GrowthCharts';
import { AIInsightsCard } from '../../components/ai/AIInsightsCard';
import { fetchApi } from '../../services/apiClient';
import { EnterpriseAnalyticsOverview } from '../../types';
import { BarChart3, Activity } from 'lucide-react';

export default function AdminAnalyticsPage() {
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
    <AdminLayout title="Enterprise Analytics & Intelligence | NexoApps Console">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-brand-cyan" /> Enterprise Analytics & Telemetry Console
            </h1>
            <p className="text-xs text-text-secondary">
              Real-time platform traffic, active user conversion rates, and device distribution metrics.
            </p>
          </div>
        </div>

        <AIInsightsCard />

        <AnalyticsOverview data={analytics} />

        <GrowthCharts data={analytics} />
      </div>
    </AdminLayout>
  );
}
