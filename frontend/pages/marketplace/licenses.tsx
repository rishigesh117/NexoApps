import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { LicenseManager } from '../../components/marketplace/LicenseManager';

export default function MarketplaceLicensesPage() {
  return (
    <>
      <Head>
        <title>License Keys & Entitlements | NexoApps</title>
        <meta name="description" content="Manage software keys and license entitlements." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LicenseManager />
        </div>
      </main>
    </>
  );
}
