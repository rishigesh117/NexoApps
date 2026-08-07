import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { EngineeringAnalytics } from '../../components/software-engineering/EngineeringAnalytics';

export default function SoftwareAnalyticsPage() {
  return (
    <>
      <Head>
        <title>Engineering Analytics & Technical Debt | NexoApps</title>
        <meta name="description" content="SDLC velocity, code coverage, and technical debt telemetry." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EngineeringAnalytics />
        </div>
      </main>
    </>
  );
}
