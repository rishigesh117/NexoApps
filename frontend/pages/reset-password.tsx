import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { MainLayout } from '../layouts/MainLayout';
import { SEOHead } from '../components/SEOHead';
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { AuthService } from '../services/authService';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, KeyRound } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = (router.query.token as string) || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isPasswordValid = useMemo(() => {
    if (newPassword.length < 8) return false;
    if (!/[A-Z]/.test(newPassword)) return false;
    if (!/[a-z]/.test(newPassword)) return false;
    if (!/[0-9]/.test(newPassword)) return false;
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) return false;
    return true;
  }, [newPassword]);

  const passwordMismatch = useMemo(() => {
    if (!confirmPassword) return false;
    return newPassword !== confirmPassword;
  }, [newPassword, confirmPassword]);

  const isValid = isPasswordValid && confirmPassword.length > 0 && !passwordMismatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await AuthService.resetPassword({
        token,
        newPassword,
      });

      setSuccessMessage('Your password has been reset successfully! You can now log in with your new password.');
      setIsLoading(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to reset password. The link may be invalid or expired.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Set New Password | NexoApps Platform"
        description="Choose a strong new password for your NexoApps account."
        canonicalUrl="https://nexoapps.com/reset-password"
      />

      <MainLayout>
        <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
          
          {/* Ambient Background Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-violet/15 rounded-full blur-[140px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl relative z-10 my-auto text-left"
          >
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-6 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-cyan to-brand-violet p-0.5 shadow-glow-cyan">
                <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                  <KeyRound className="w-6 h-6 text-brand-cyan" />
                </div>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Create New Password
              </h1>
              <p className="text-xs text-text-muted">
                Please enter your new password below.
              </p>
            </div>

            {/* Success Message Banner */}
            {successMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <p className="font-semibold text-sm">{successMessage}</p>
                <Link
                  href="/login"
                  className="inline-block px-5 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 transition-all"
                >
                  Proceed to Login
                </Link>
              </div>
            ) : (
              /* Reset Password Form */
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errorMessage && (
                  <div role="alert" className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 1. New Password Field */}
                <div>
                  <label htmlFor="reset-new-password" className="block text-xs font-semibold text-text-secondary mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                    <input
                      id="reset-new-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3.5 top-3 text-text-muted hover:text-white transition-colors p-0.5 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  <PasswordStrengthMeter password={newPassword} />
                </div>

                {/* 2. Confirm Password Field */}
                <div>
                  <label htmlFor="reset-confirm-password" className="block text-xs font-semibold text-text-secondary mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                    <input
                      id="reset-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      aria-invalid={passwordMismatch}
                      aria-describedby={passwordMismatch ? 'reset-confirm-password-error' : undefined}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      className="absolute right-3.5 top-3 text-text-muted hover:text-white transition-colors p-0.5 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordMismatch && (
                    <p id="reset-confirm-password-error" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Passwords do not match
                    </p>
                  )}
                </div>

                <PrimaryButton
                  type="submit"
                  disabled={!isValid || isLoading}
                  className="w-full py-3.5 text-xs font-bold shadow-glow-cyan flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <span>Reset Password</span>
                  )}
                </PrimaryButton>
              </form>
            )}

          </motion.div>

        </div>
      </MainLayout>
    </>
  );
}
