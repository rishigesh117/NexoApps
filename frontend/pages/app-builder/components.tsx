import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { ComponentLibrary } from '../../components/app-builder/ComponentLibrary';

export default function AppComponentsPage() {
  return (
    <>
      <Head>
        <title>AI Component Library | NexoApps Version 6.1</title>
        <meta name="description" content="Reusable low-code AI components and block registry." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <ComponentLibrary />
        </div>
      </main>
    </>
  );
}
