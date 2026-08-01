import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '../layouts/MainLayout';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../services/authService';
import { MailCheck, AlertCircle, Clock, Loader2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

type VerificationState = 'VERIFYING' | 'SUCCESS' | 'EXPIRED' | 'FAILED';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { email, token, status } = router.query;
  const { refreshUser } = useAuth();

  const [state, setState] = useState<VerificationState>('VERIFYING');
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    if (status === 'expired') {
      setState('EXPIRED');
      return;
    }

    if (status === 'failed') {
      setState('FAILED');
      return;
    }

    const targetEmail = (email as string) || 'user@nexoapps.com';

    // Perform verification request to backend POST /api/v1/auth/verify-email
    AuthService.verifyEmailToken(targetEmail)
      .then((success) => {
        if (success) {
          setState('SUCCESS');
          refreshUser();
        } else {
          setState('EXPIRED');
        }
      })
      .catch(() => {
        setState('FAILED');
      });
  }, [router.isReady, email, status, refreshUser]);

  const handleResend = async () => {
    setIsResending(true);
    setResendStatus(null);
    const targetEmail = (email as string) || '';
    const res = await AuthService.resendVerificationEmail(targetEmail);
    setResendStatus(res.message);
    setIsResending(false);
  };

  return (
    <>
      <SEOHead
        title="Email Verification | NexoApps Platform"
        description="Verify your NexoApps account email address."
        canonicalUrl="https://nexoapps.com/verify-email"
      />

      <MainLayout>
        <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
          
          {/* Ambient Glowing Orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl relative z-10 my-auto text-center space-y-6"
          >
            <AnimatePresence mode="wait">
              
              {/* 1. VERIFYING STATE */}
              {state === 'VERIFYING' && (
                <motion.div
                  key="verifying"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-6 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-surface-200 border border-white/10 flex items-center justify-center mx-auto text-brand-cyan">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Verifying Email...</h2>
                  <p className="text-xs text-text-muted">
                    Please wait while we confirm your email verification request.
                  </p>
                </motion.div>
              )}

              {/* 2. SUCCESS STATE */}
              {state === 'SUCCESS' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-4 space-y-5"
                >
                  <div className="relative inline-block">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-emerald via-brand-cyan to-brand-violet p-1 shadow-glow-emerald flex items-center justify-center">
                      <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-brand-emerald animate-bounce" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">
                      Email Verified Successfully!
                    </h2>
                    <p className="text-xs text-text-secondary leading-relaxed max-w-xs mx-auto">
                      All platform features have been unlocked for your account.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/profile"
                      className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-cyan text-white text-xs font-bold shadow-glow-emerald hover:opacity-95 transition-all"
                    >
                      <span>Go to Account Center</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* 3. EXPIRED STATE */}
              {state === 'EXPIRED' && (
                <motion.div
                  key="expired"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-4 space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                    <Clock className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">
                      Link Expired
                    </h2>
                    <p className="text-xs text-text-muted leading-relaxed max-w-xs mx-auto">
                      This email verification link has expired or has already been used.
                    </p>
                  </div>

                  {resendStatus && (
                    <div className="p-3 rounded-xl bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-xs">
                      {resendStatus}
                    </div>
                  )}

                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleResend}
                      disabled={isResending}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue font-bold text-xs text-white shadow-glow-cyan hover:opacity-95 transition-all flex items-center justify-center gap-2"
                    >
                      {isResending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Resending...</span>
                        </>
                      ) : (
                        <span>Resend Verification Email</span>
                      )}
                    </button>

                    <Link
                      href="/profile"
                      className="inline-block text-xs font-semibold text-text-muted hover:text-white transition-colors"
                    >
                      Return to Account Center
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* 4. FAILED STATE */}
              {state === 'FAILED' && (
                <motion.div
                  key="failed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-4 space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
                    <AlertCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">
                      Verification Failed
                    </h2>
                    <p className="text-xs text-text-muted leading-relaxed max-w-xs mx-auto">
                      Unable to verify email token. The link may be invalid.
                    </p>
                  </div>

                  {resendStatus && (
                    <div className="p-3 rounded-xl bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-xs">
                      {resendStatus}
                    </div>
                  )}

                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleResend}
                      disabled={isResending}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue font-bold text-xs text-white shadow-glow-cyan hover:opacity-95 transition-all flex items-center justify-center gap-2"
                    >
                      {isResending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Resending...</span>
                        </>
                      ) : (
                        <span>Resend Verification Email</span>
                      )}
                    </button>

                    <Link
                      href="/profile"
                      className="inline-block text-xs font-semibold text-text-muted hover:text-white transition-colors"
                    >
                      Return to Account Center
                    </Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

        </div>
      </MainLayout>
    </>
  );
}
