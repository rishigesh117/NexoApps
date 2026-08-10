import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Lock, ShieldAlert } from 'lucide-react';
import { PrimaryButton } from './ui/PrimaryButton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ['MEMBER', 'DEVELOPER', 'ADMIN', 'OWNER'],
  fallback,
}) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated || !allowedRoles.includes(role)) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 max-w-md mx-auto my-12 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center mx-auto text-brand-cyan">
          <Lock className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">Access Restricted</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            You must be logged in as a <strong>Member</strong> or <strong>Admin</strong> to access this feature.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
