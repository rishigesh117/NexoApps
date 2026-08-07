import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TriggerManager } from '../../components/automation/TriggerManager';

export default function TriggersPage() {
  return (
    <>
      <SEOHead
        title="Event Triggers & Subscriptions | NexoApps"
        description="Event-driven triggers, webhooks, and cron job management."
      />
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TriggerManager />
        </main>
        <Footer />
      </div>
    </>
  );
}
