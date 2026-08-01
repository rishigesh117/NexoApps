import React from 'react';
import Head from 'next/head';
import { MainLayout } from '../layouts/MainLayout';
import { WifiOff, RefreshCw } from 'lucide-react';
import { PrimaryButton } from '../components/ui/PrimaryButton';

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>You are Offline | NexoApps PWA</title>
        <meta name="description" content="You are currently offline. Check your internet connection." />
      </Head>

      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 max-w-lg mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center mx-auto text-brand-cyan">
              <WifiOff className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-white">No Internet Connection</h1>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                You are viewing NexoApps in PWA offline mode. Reconnect to the internet to download new APK packages and view live updates.
              </p>
            </div>

            <div className="pt-2">
              <PrimaryButton size="sm" icon={<RefreshCw className="w-4 h-4" />} onClick={handleRetry}>
                Check Connection
              </PrimaryButton>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
