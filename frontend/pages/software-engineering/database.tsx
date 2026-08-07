import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { DatabaseDesigner } from '../../components/software-engineering/DatabaseDesigner';

export default function SoftwareDatabasePage() {
  return (
    <>
      <Head>
        <title>Database ER & Schema Designer | NexoApps</title>
        <meta name="description" content="Visual ER diagrams and SQL migration schema designer." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DatabaseDesigner />
        </div>
      </main>
    </>
  );
}
