import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CloudControlDashboard } from '../../components/cloud-control/CloudControlDashboard';

export default function CloudControlPage() {
  return (
    <>
      <Head>
        <title>Global Cloud Control Plane | NexoApps</title>
        <meta name="description" content="Multi-region infrastructure management, global service placement, edge workloads, disaster recovery, and cloud cost governance for NexoApps." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                Global Cloud Control Plane
              </h1>
              <p className="text-sm text-text-muted mt-1">
                Version 9.5 Multi-Region Infrastructure, Edge Operations & Disaster Recovery Orchestration
              </p>
            </div>
          </div>
          <CloudControlDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}
