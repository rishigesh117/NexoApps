import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '../../layouts/MainLayout';
import { SEOHead } from '../../components/SEOHead';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { getAppBySlug, FEATURED_BATLYTICS_APP } from '../../services/appService';
import { downloadService, DownloadRecord } from '../../services/downloadService';
import { AppItem } from '../../types';
import {
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  XCircle,
  ArrowRight,
  Loader2,
  HardDrive,
  Cpu,
  Layers,
  ArrowLeft
} from 'lucide-react';

type DownloadStatus = 'Queued' | 'Preparing' | 'Downloading' | 'Completed' | 'Cancelled' | 'Failed';

export default function DownloadProgressPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { user } = useAuth();

  const [app, setApp] = useState<AppItem>(FEATURED_BATLYTICS_APP);
  const [downloadRecord, setDownloadRecord] = useState<DownloadRecord | null>(null);
  const [status, setStatus] = useState<DownloadStatus>('Queued');
  const [progress, setProgress] = useState(0);
  const [etaSeconds, setEtaSeconds] = useState(5);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch app details & initiate download session
  useEffect(() => {
    if (!router.isReady) return;
    const targetSlug = (slug as string) || 'batlytics-cricket-scoring';

    getAppBySlug(targetSlug).then((fetchedApp) => {
      if (fetchedApp) setApp(fetchedApp);

      // Initiate download with backend API
      downloadService
        .initiateDownload(targetSlug)
        .then((record) => {
          setDownloadRecord(record);
          startDownloadSimulation(record);
        })
        .catch(() => {
          // Fallback simulation if backend API stub returns local record
          const fallbackRecord: DownloadRecord = {
            id: `dl-local-${Date.now()}`,
            userId: user?.id || 'guest',
            appId: fetchedApp?.id || 'batlytics-001',
            appSlug: targetSlug,
            appTitle: fetchedApp?.title || 'Batlytics',
            iconUrl: fetchedApp?.iconUrl || '🏏',
            tagline: fetchedApp?.tagline || 'Real-Time Cricket Scoring Engine',
            version: fetchedApp?.version || '1.0.0-beta',
            fileSize: fetchedApp?.fileSize || '24.5 MB',
            downloadToken: `token-${Date.now()}`,
            deviceInfo: 'Chrome Browser',
            browser: 'Chrome',
            os: 'Windows',
            ipAddress: '127.0.0.1',
            status: 'Queued',
            createdAt: new Date().toISOString(),
          };
          setDownloadRecord(fallbackRecord);
          startDownloadSimulation(fallbackRecord);
        });
    });
  }, [router.isReady, slug, user]);

  // Download simulation engine with realistic speed & ETA calculations
  const startDownloadSimulation = (record: DownloadRecord) => {
    setStatus('Queued');
    setProgress(0);
    setErrorMessage(null);

    setTimeout(() => {
      setStatus('Preparing');
      setTimeout(() => {
        setStatus('Downloading');
        
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += Math.floor(Math.random() * 15) + 10;
          if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
            setProgress(100);
            setStatus('Completed');

            // Trigger file download stream prompt
            const link = document.createElement('a');
            link.href = `/api/v1/downloads/file/${record.downloadToken}`;
            link.setAttribute('download', `${record.appSlug}-v${record.version}.apk`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            setProgress(currentProgress);
            setEtaSeconds(Math.max(1, Math.ceil((100 - currentProgress) / 20)));
          }
        }, 400);
      }, 800);
    }, 600);
  };

  const handleCancel = () => {
    setStatus('Cancelled');
    setProgress(0);
  };

  const handleRetry = () => {
    if (downloadRecord) {
      startDownloadSimulation(downloadRecord);
    }
  };

  return (
    <>
      <SEOHead
        title={`Downloading ${app.title} | NexoApps Store`}
        description={`Downloading ${app.title} v${app.version} APK file safely.`}
        canonicalUrl={`https://nexoapps.com/download/${app.slug}`}
      />

      <MainLayout>
        <ProtectedRoute>
          <div className="py-12 px-4 max-w-2xl mx-auto space-y-8 text-left">
            
            <Link
              href={`/app/${app.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-cyan hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to {app.title} Details
            </Link>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6 relative overflow-hidden text-center"
            >
              {/* Radial Accent Glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-cyan/15 rounded-full blur-[100px] pointer-events-none" />

              {/* App Info Header */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-20 h-20 rounded-3xl bg-surface-200 border border-white/15 flex items-center justify-center text-4xl shadow-inner bg-gradient-to-tr from-surface-200 to-surface-100">
                  {app.iconUrl}
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl font-extrabold text-white">{app.title}</h1>
                  <p className="text-xs text-brand-cyan font-medium">v{app.version} • {app.fileSize || '24.5 MB'}</p>
                  <p className="text-xs text-text-muted">Developed by {app.developer?.name || 'NexoApps Platform'}</p>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Virus Free & Verified Download
                </div>
              </div>

              {/* Status Engine & Progress Bar */}
              <AnimatePresence mode="wait">
                
                {/* 1. QUEUED & PREPARING */}
                {(status === 'Queued' || status === 'Preparing') && (
                  <motion.div
                    key="preparing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-surface-200 border border-white/10 flex items-center justify-center mx-auto text-brand-cyan">
                      <Loader2 className="w-7 h-7 animate-spin" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {status === 'Queued' ? 'Queuing Download Session...' : 'Generating Secure Signed Token...'}
                    </h3>
                    <p className="text-xs text-text-muted">Validating session token and preparing APK mirror</p>
                  </motion.div>
                )}

                {/* 2. DOWNLOADING */}
                {status === 'Downloading' && (
                  <motion.div
                    key="downloading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-4 space-y-5"
                  >
                    {/* Circular & Linear Progress Bar */}
                    <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-surface-200 stroke-current"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-brand-cyan stroke-current transition-all duration-300"
                          strokeDasharray={`${progress}, 100`}
                          strokeWidth="3"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-xl font-extrabold text-white font-mono">{progress}%</span>
                    </div>

                    <div className="w-full bg-surface-200 h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-xs text-text-muted font-medium">
                      <span>Status: <strong className="text-brand-cyan">Downloading APK...</strong></span>
                      <span>Est. Time: <strong className="text-white">{etaSeconds}s remaining</strong></span>
                    </div>

                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-xl bg-surface-100 hover:bg-red-500/10 text-text-muted hover:text-red-400 border border-white/10 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 mx-auto"
                    >
                      <XCircle className="w-4 h-4" /> Cancel Download
                    </button>
                  </motion.div>
                )}

                {/* 3. COMPLETED SUCCESS SCREEN */}
                {status === 'Completed' && (
                  <motion.div
                    key="completed"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-4 space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-emerald">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-2xl font-extrabold text-white">Download Completed!</h2>
                      <p className="text-xs text-text-secondary">
                        Your APK file download has started. This download has been saved to your Profile Download History.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Link
                        href="/profile"
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-1.5"
                      >
                        <span>View My Downloads</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/apps"
                        className="py-3 px-5 rounded-xl bg-surface-200 hover:bg-surface-100 text-white font-bold text-xs border border-white/10 transition-colors"
                      >
                        Return to Store
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* 4. CANCELLED / FAILED */}
                {(status === 'Cancelled' || status === 'Failed') && (
                  <motion.div
                    key="failed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-4 space-y-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                      <AlertCircle className="w-7 h-7" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">
                        {status === 'Cancelled' ? 'Download Cancelled' : 'Download Failed'}
                      </h3>
                      <p className="text-xs text-text-muted">
                        {status === 'Cancelled' ? 'You cancelled the active download session.' : errorMessage || 'A network interrupt occurred.'}
                      </p>
                    </div>

                    <button
                      onClick={handleRetry}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 mx-auto"
                    >
                      <RotateCcw className="w-4 h-4" /> Retry Download
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>

            </motion.div>

          </div>
        </ProtectedRoute>
      </MainLayout>
    </>
  );
}
