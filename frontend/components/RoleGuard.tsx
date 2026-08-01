import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ShieldAlert, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface RoleGuardProps {
  children: React.ReactNode;
  roles?: UserRole[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  roles = ['ADMIN'],
}) => {
  const router = useRouter();
  const { user, isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?returnUrl=${encodeURIComponent(router.asPath)}`);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Redirecting
  }

  const hasPermission = user && (roles.includes(role) || role === 'OWNER');

  if (!hasPermission) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 max-w-lg w-full text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">Admin Access Required</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              You are signed in as <strong>{user?.email}</strong> ({user?.role}). This area is restricted exclusively to NexoApps Platform Administrators.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-text-muted text-left space-y-1">
            <span className="font-semibold text-white block">Need Developer or Admin Access?</span>
            <p>Contact system administrators to promote your account permissions.</p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
