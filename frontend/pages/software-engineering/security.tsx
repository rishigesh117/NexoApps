import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { SecurityScanner } from '../../components/software-engineering/SecurityScanner';
import { DependencyViewer } from '../../components/software-engineering/DependencyViewer';

export default function SoftwareSecurityPage() {
  return (
    <>
      <Head>
        <title>Security Center & Vulnerability Audit | NexoApps</title>
        <meta name="description" content="Automated security scanner and dependency graph auditor." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <SecurityScanner />
          <DependencyViewer />
        </div>
      </main>
    </>
  );
}
