import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MainLayout } from '../layouts/MainLayout';
import { SEOHead } from '../components/SEOHead';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { AuthService } from '../services/authService';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Loader2, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const emailError = useMemo(() => {
    if (!email) return null;
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return 'Please enter a valid email address';
    return null;
  }, [email]);

  const isValid = email.trim().length > 0 && !emailError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await AuthService.forgotPassword(email.trim());
      setSuccessMessage('If an account exists with this email, a reset link has been prepared.');
      setIsLoading(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to request password reset. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Forgot Password | NexoApps Platform"
        description="Reset your NexoApps account password safely."
        canonicalUrl="https://nexoapps.com/forgot-password"
      />

      <MainLayout>
        <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
          
          {/* Ambient Background Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl relative z-10 my-auto text-left"
          >
            {/* Back link */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-6 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-cyan to-brand-violet p-0.5 shadow-glow-cyan">
                <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                  <KeyRound className="w-6 h-6 text-brand-cyan" />
                </div>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Reset Password
              </h1>
              <p className="text-xs text-text-muted max-w-xs">
                Enter your account email address and we'll send you instructions to reset your password.
              </p>
            </div>

            {/* Success Message Banner */}
            {successMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-semibold">{successMessage}</p>
                <p className="text-[11px] text-text-secondary pt-2">
                  Please check your inbox or click below to return to login.
                </p>
                <Link
                  href="/login"
                  className="inline-block mt-3 px-4 py-2 rounded-xl bg-surface-200 text-white font-bold text-xs hover:bg-surface-100 transition-colors"
                >
                  Return to Login
                </Link>
              </div>
            ) : (
              /* Request Form */
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errorMessage && (
                  <div role="alert" className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="forgot-email" className="block text-xs font-semibold text-text-secondary mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                    <input
                      id="forgot-email"
                      type="email"
                      required
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!emailError}
                      aria-describedby={emailError ? 'forgot-email-error' : undefined}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-all"
                    />
                  </div>
                  {emailError && (
                    <p id="forgot-email-error" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {emailError}
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
                      <span>Sending Instructions...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
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
