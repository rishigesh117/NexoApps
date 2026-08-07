import React from 'react';
import Head from 'next/head';
import { Upload } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function PublisherReleasesPage() {
  return (
    <>
      <Head>
        <title>Package Releases & Versioning | NexoApps</title>
        <meta name="description" content="Release updates, changelogs, and package upload wizard." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Upload className="w-6 h-6 text-brand-cyan" />
              Package Release Manager & Upload Wizard
            </h1>
            <p className="text-xs text-text-muted">Upload package tarballs, update semantic version tags, and record changelogs.</p>
          </div>
        </div>
      </main>
    </>
  );
}
