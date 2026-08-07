import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { RepositoryExplorer } from '../../components/software-engineering/RepositoryExplorer';
import { PullRequestCenter } from '../../components/software-engineering/PullRequestCenter';

export default function SoftwareRepositoriesPage() {
  return (
    <>
      <Head>
        <title>Git Repositories & Pull Requests | NexoApps</title>
        <meta name="description" content="Virtual Git repository manager, branches, and pull requests." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <RepositoryExplorer />
          <PullRequestCenter />
        </div>
      </main>
    </>
  );
}
