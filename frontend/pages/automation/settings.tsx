import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AutomationSettings } from '../../components/automation/AutomationSettings';

export default function SettingsPage() {
  return (
    <>
      <SEOHead
        title="Automation Settings | NexoApps"
        description="Configure runtime limits, retry strategies, and audit retention."
      />
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AutomationSettings />
        </main>
        <Footer />
      </div>
    </>
  );
}
