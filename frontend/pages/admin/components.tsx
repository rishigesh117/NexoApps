import React from 'react';
import Head from 'next/head';
import { Boxes } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ComponentLibrary } from '../../components/app-builder/ComponentLibrary';

export default function AdminComponentsPage() {
  return (
    <>
      <Head>
        <title>Component Library Admin | NexoApps Admin</title>
        <meta name="description" content="Manage low-code AI components and published blocks." />
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
                    <Boxes className="w-6 h-6 text-brand-cyan" />
                    Component Library Administration
                  </h1>
                  <p className="text-xs text-text-secondary">Reusable AI block registry and category definitions</p>
                </div>
              </div>

              <ComponentLibrary />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
