import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { ApplicationStudio } from '../../components/app-builder/ApplicationStudio';

export default function AppStudioPage() {
  return (
    <>
      <Head>
        <title>Visual Low-Code Studio | NexoApps Version 6.1</title>
        <meta name="description" content="Visual drag-and-drop canvas studio for AI applications." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <ApplicationStudio />
        </div>
      </main>
    </>
  );
}
