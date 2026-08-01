import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MainLayout } from '../layouts/MainLayout';
import { Home, Layers, AlertCircle } from 'lucide-react';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | NexoApps</title>
        <meta name="description" content="The requested page could not be found on NexoApps Platform." />
      </Head>

      <MainLayout>
        <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 relative py-16">
          
          {/* Ambient Glow */}
          <div className="absolute w-[350px] h-[350px] bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 max-w-lg mx-auto space-y-6 relative"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet p-0.5 shadow-glow-cyan mx-auto">
              <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-brand-cyan" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-6xl font-extrabold tracking-tight text-white gradient-text">
                404
              </h1>
              <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                The app page or link you are looking for might have been moved, renamed, or is currently undergoing maintenance.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue text-xs font-bold text-white shadow-glow-cyan hover:opacity-95 hover:scale-105 transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </MainLayout>
    </>
  );
}
