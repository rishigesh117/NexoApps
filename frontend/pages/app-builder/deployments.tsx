import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { DeploymentWizard } from '../../components/app-builder/DeploymentWizard';

export default function AppDeploymentsPage() {
  return (
    <>
      <Head>
        <title>One-Click Deployment Center | NexoApps Version 6.1</title>
        <meta name="description" content="One-click deployment wizard and active cloud targets." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <DeploymentWizard />
        </div>
      </main>
    </>
  );
}
