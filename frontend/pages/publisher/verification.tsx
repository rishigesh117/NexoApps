import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { PublisherVerificationCard } from '../../components/marketplace/PublisherVerificationCard';

export default function PublisherVerificationPage() {
  return (
    <>
      <Head>
        <title>Publisher Verification | NexoApps</title>
        <meta name="description" content="Verified publisher credentials and domain audit status." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PublisherVerificationCard />
        </div>
      </main>
    </>
  );
}
