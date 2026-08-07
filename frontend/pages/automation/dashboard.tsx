import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AutomationDashboard } from '../../components/automation/AutomationDashboard';

export default function AutomationDashboardPage() {
  return (
    <>
      <SEOHead
        title="Automation Dashboard | NexoApps"
        description="Executive dashboard for enterprise business process orchestration."
      />
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AutomationDashboard />
        </main>
        <Footer />
      </div>
    </>
  );
}
