import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from '../layouts/MainLayout';
import { ServerCrash, Home, RefreshCw } from 'lucide-react';
import { PrimaryButton } from '../components/ui/PrimaryButton';

export default function Custom500() {
  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>500 - Server Error | NexoApps</title>
        <meta name="description" content="An internal server error occurred on NexoApps." />
      </Head>

      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-red-500/20 bg-red-500/5 max-w-lg mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
              <ServerCrash className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold text-white">500 Server Error</h1>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Our servers encountered a temporary issue. The system administrator has been notified.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <PrimaryButton size="sm" icon={<RefreshCw className="w-4 h-4" />} onClick={handleReload}>
                Reload Page
              </PrimaryButton>
              <Link
                href="/"
                className="px-6 py-2.5 rounded-full bg-surface-100 border border-white/10 text-xs font-semibold text-white hover:bg-surface-200 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
