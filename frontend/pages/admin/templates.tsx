import React from 'react';
import Head from 'next/head';
import { Store } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { TemplateMarketplace } from '../../components/app-builder/TemplateMarketplace';

export default function AdminTemplatesPage() {
  return (
    <>
      <Head>
        <title>Template Marketplace Admin | NexoApps Admin</title>
        <meta name="description" content="Manage starter templates and application marketplace." />
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
                    <Store className="w-6 h-6 text-brand-cyan" />
                    Template Marketplace Governance
                  </h1>
                  <p className="text-xs text-text-secondary">App starter kits and public templates registry</p>
                </div>
              </div>

              <TemplateMarketplace />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
