import React from 'react';
import Head from 'next/head';
import { Cpu } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AIProjectCreator } from '../../components/software-engineering/AIProjectCreator';

export default function AdminProjectsPage() {
  return (
    <>
      <Head>
        <title>Project Manager Admin | NexoApps Admin</title>
        <meta name="description" content="Enterprise project governance and AI generator." />
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
                    <Cpu className="w-6 h-6 text-brand-cyan" />
                    Enterprise Project Governance & Synthesis
                  </h1>
                  <p className="text-xs text-text-secondary">Global project templates & architecture policies</p>
                </div>
              </div>

              <AIProjectCreator />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
