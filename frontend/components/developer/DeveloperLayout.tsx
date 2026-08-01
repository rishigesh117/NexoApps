import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SEOHead } from '../SEOHead';
import { useAuth } from '../../context/AuthContext';
import { DeveloperHeader } from './DeveloperHeader';
import { DeveloperSidebar } from './DeveloperSidebar';
import { Code2, ArrowLeft, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface DeveloperLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const DeveloperLayout: React.FC<DeveloperLayoutProps> = ({
  children,
  title = 'Developer Workspace | NexoApps Console',
  description = 'Developer Console for NexoApps app management and analytics',
}) => {
  const router = useRouter();
  const { user, isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?returnUrl=${encodeURIComponent(router.asPath)}`);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  // If user is MEMBER (not yet Developer / Admin / Owner)
  if (user && role === 'MEMBER') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 max-w-lg w-full text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto text-brand-cyan">
            <Code2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">Become a NexoApps Developer</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              You are currently signed in as <strong>{user.email}</strong> (Member). Apply for a Developer Account to publish applications to the NexoApps marketplace.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/developer/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Apply for Developer Account</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-text-secondary hover:text-white bg-white/5 border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead title={title} description={description} />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased selection:bg-brand-cyan selection:text-slate-950">
        <DeveloperHeader />

        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
          <DeveloperSidebar />

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
};
