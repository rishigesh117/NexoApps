import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { MainLayout } from '../layouts/MainLayout';
import { SEOHead } from '../components/SEOHead';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';
import { Layers } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const returnUrl = (router.query.returnUrl as string) || (router.query.from as string) || '/';

  // Automatically redirect already logged-in users away from the Login page
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(returnUrl);
    }
  }, [isAuthenticated, returnUrl, router]);

  return (
    <>
      <SEOHead
        title="Login to Account | NexoApps Platform"
        description="Sign in to your NexoApps account to access Android APK downloads, write reviews, and save preferences."
        canonicalUrl="https://nexoapps.com/login"
      />

      <MainLayout>
        <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
          
          {/* Animated Ambient Background Glow Orbs */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-brand-cyan/20 rounded-full blur-[140px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/3 left-1/4 w-[350px] h-[220px] bg-brand-violet/20 rounded-full blur-[120px] pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl relative z-10 my-auto"
          >
            {/* Logo & Heading Header */}
            <div className="flex flex-col items-center text-center mb-6 space-y-2">
              <Link href="/" className="group mb-2" aria-label="NexoApps Homepage">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet p-0.5 shadow-glow-cyan transition-transform group-hover:scale-105">
                  <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                    <Layers className="w-6 h-6 text-brand-cyan" />
                  </div>
                </div>
              </Link>

              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Welcome Back
              </h1>
              <p className="text-xs text-text-muted">
                Sign in to NexoApps to access your apps and downloads
              </p>
            </div>

            {/* Reusable Form Component */}
            <LoginForm returnUrl={returnUrl} />
          </motion.div>

        </div>
      </MainLayout>
    </>
  );
}
