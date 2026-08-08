import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { RegionManager } from '../../components/cloud-control/RegionManager';
import { ZoneManager } from '../../components/cloud-control/ZoneManager';
import { RegionHealthDashboard } from '../../components/cloud-control/RegionHealthDashboard';

export default function RegionsPage() {
  return (
    <>
      <Head>
        <title>Global Regions | NexoApps</title>
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <RegionManager />
          <ZoneManager />
          <RegionHealthDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}
