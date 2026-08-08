import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CloudCostDashboard } from '../../components/cloud-control/CloudCostDashboard';

export default function CostPage() {
  return (
    <>
      <Head>
        <title>Cloud Cost & Optimization | NexoApps</title>
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <CloudCostDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}
