import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { DocumentationGenerator } from '../../components/software-engineering/DocumentationGenerator';

export default function SoftwareDocumentationPage() {
  return (
    <>
      <Head>
        <title>Auto Documentation Studio | NexoApps</title>
        <meta name="description" content="Automated README generator, API docs & technical documentation." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DocumentationGenerator />
        </div>
      </main>
    </>
  );
}
