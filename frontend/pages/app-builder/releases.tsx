import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { VersionTimeline } from '../../components/app-builder/VersionTimeline';

export default function AppReleasesPage() {
  return (
    <>
      <Head>
        <title>Application Releases & Snapshots | NexoApps Version 6.1</title>
        <meta name="description" content="Release tags, version timelines, and snapshot history." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <VersionTimeline />
        </div>
      </main>
    </>
  );
}
