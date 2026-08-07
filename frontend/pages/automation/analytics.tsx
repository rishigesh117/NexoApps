import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { WorkflowAnalytics } from '../../components/automation/WorkflowAnalytics';
import { RecommendationCenter } from '../../components/automation/RecommendationCenter';

export default function AnalyticsPage() {
  return (
    <>
      <SEOHead
        title="Process Analytics & ROI | NexoApps"
        description="Process analytics, time & cost savings calculations, and AI recommendations."
      />
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <WorkflowAnalytics />
          <RecommendationCenter />
        </main>
        <Footer />
      </div>
    </>
  );
}
