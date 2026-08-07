import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { DownloadManager } from '../../components/marketplace/DownloadManager';

export default function MarketplaceDownloadsPage() {
  return (
    <>
      <Head>
        <title>Download History | NexoApps</title>
        <meta name="description" content="Installed packages and download history." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DownloadManager />
        </div>
      </main>
    </>
  );
}
