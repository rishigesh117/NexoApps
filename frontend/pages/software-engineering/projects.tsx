import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { AIProjectCreator } from '../../components/software-engineering/AIProjectCreator';

export default function SoftwareProjectsPage() {
  return (
    <>
      <Head>
        <title>Software Project Manager | NexoApps</title>
        <meta name="description" content="Manage software projects and generate new AI codebases." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AIProjectCreator />
        </div>
      </main>
    </>
  );
}
