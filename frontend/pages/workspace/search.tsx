import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { UniversalSidebar } from '../../components/ai-os/UniversalSidebar';
import { UniversalSearch } from '../../components/ai-os/UniversalSearch';

export default function WorkspaceSearchPage() {
  return (
    <>
      <Head>
        <title>Universal Search | NexoApps AI OS</title>
        <meta name="description" content="Universal cross-module search engine." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <UniversalSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              <UniversalSearch />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
