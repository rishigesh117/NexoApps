import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { ReleasePipelineViewer } from '../../components/software-engineering/ReleasePipelineViewer';

export default function SoftwareReleasesPage() {
  return (
    <>
      <Head>
        <title>SDLC Release & Deployment Pipelines | NexoApps</title>
        <meta name="description" content="SDLC release pipelines and deployment histories." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ReleasePipelineViewer />
        </div>
      </main>
    </>
  );
}
