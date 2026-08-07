import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { RPABotManager } from '../../components/automation/RPABotManager';

export default function RPAPage() {
  return (
    <>
      <SEOHead
        title="RPA Bot Manager | NexoApps"
        description="Robotic process automation bots, job queuing, and execution."
      />
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RPABotManager />
        </main>
        <Footer />
      </div>
    </>
  );
}
