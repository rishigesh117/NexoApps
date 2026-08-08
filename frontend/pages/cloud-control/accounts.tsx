import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CloudAccountManager } from '../../components/cloud-control/CloudAccountManager';

export default function AccountsPage() {
  return (
    <>
      <Head>
        <title>Cloud Accounts | NexoApps</title>
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <CloudAccountManager />
        </div>
      </main>
      <Footer />
    </>
  );
}
