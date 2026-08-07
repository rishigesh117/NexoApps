import React from 'react';
import Head from 'next/head';
import { ShieldCheck } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { PublisherDashboard } from '../../components/marketplace/PublisherDashboard';

export default function AdminPublishersPage() {
  return (
    <>
      <Head>
        <title>Publisher Verification Center | NexoApps Admin</title>
        <meta name="description" content="Publisher verification and credential moderation." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-brand-cyan" />
                    Publisher Verification & Identity Moderation
                  </h1>
                  <p className="text-xs text-text-secondary">Approve creator identities and domain verifications</p>
                </div>
              </div>

              <PublisherDashboard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
