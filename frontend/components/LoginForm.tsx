import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, Clock, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../services/authService';
import { PrimaryButton } from './ui/PrimaryButton';
import Link from 'next/link';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
  returnUrl?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToSignup,
  returnUrl,
}) => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState<string>('');

  // Account Lock Countdown Timer State
  const [lockTimeRemaining, setLockTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockTimeRemaining !== null && lockTimeRemaining > 0) {
      timer = setInterval(() => {
        setLockTimeRemaining((prev) => (prev && prev > 1 ? prev - 1 : null));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockTimeRemaining]);

  // Format seconds into MM:SS
  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Live Email Format Validation
  const emailError = useMemo(() => {
    if (!email) return null;
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return 'Please enter a valid email address';
    return null;
  }, [email]);

  const isFormValid = email.trim().length > 0 && !emailError && password.length > 0 && lockTimeRemaining === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();

    try {
      // Capture device metadata for active session registration
      const deviceInfo = AuthService.getDeviceInformation();
      console.log('[SECURITY LOG]: Login requested from device:', deviceInfo);

      await login({
        email: cleanEmail,
        password,
      });

      const storedUser = AuthService.getStoredUser();
      const uname = storedUser?.username || cleanEmail.split('@')[0] || 'User';
      setLoggedInUsername(uname);

      // Show Success Toast Animation
      setIsSuccess(true);

      setTimeout(() => {
        if (onSuccess) onSuccess();

        // Smart redirection: back to app page if prompted during download, or homepage
        const targetUrl = returnUrl || (router.query.returnUrl as string) || (router.query.from as string) || '/';
        router.push(targetUrl);
      }, 1800);
    } catch (err: any) {
      const msg = err.message || 'Invalid email address or password';
      
      // Handle Account Lockout Detection (HTTP 423 or lock message)
      if (msg.toLowerCase().includes('lock') || msg.toLowerCase().includes('locked')) {
        setLockTimeRemaining(15 * 60); // 15 minutes lockout countdown
        setErrorMessage('Too many failed login attempts. Account temporarily locked for 15 minutes.');
      } else {
        setErrorMessage(msg);
      }
      
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          /* Premium Success Celebration & Toast */
          <motion.div
            key="success-view"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center py-8 space-y-4"
          >
            <div className="px-4 py-2.5 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan text-xs font-bold flex items-center gap-2 shadow-glow-cyan animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span>Welcome back, {loggedInUsername}!</span>
            </div>

            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-violet p-1 shadow-glow-cyan flex items-center justify-center">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-brand-cyan" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Login Successful</h3>
              <p className="text-xs text-text-muted">Redirecting you to your destination...</p>
            </div>
          </motion.div>
        ) : (
          /* Login Form */
          <motion.form
            key="login-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-4 text-left"
            noValidate
          >
            {/* Account Lockout Countdown Banner */}
            {lockTimeRemaining !== null && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3 shadow-lg">
                <Clock className="w-5 h-5 shrink-0 text-amber-400 mt-0.5 animate-pulse" />
                <div className="space-y-1">
                  <p className="font-bold">Too many failed login attempts.</p>
                  <p className="text-[11px] text-amber-200">
                    Try again after the remaining lock time:{' '}
                    <strong className="font-mono text-xs text-amber-400 underline">
                      {formatCountdown(lockTimeRemaining)}
                    </strong>
                  </p>
                </div>
              </div>
            )}

            {/* Error Alert Banner */}
            {errorMessage && lockTimeRemaining === null && (
              <div
                role="alert"
                className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5 shadow-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Email Address Field */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-text-secondary mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'login-email-error' : undefined}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-all"
                />
              </div>
              {emailError && (
                <p id="login-email-error" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {emailError}
                </p>
              )}
            </div>

            {/* 2. Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="login-password" className="text-xs font-semibold text-text-secondary">
                  Password
                </label>
                {/* 4. Forgot Password Link */}
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-brand-cyan hover:underline font-semibold focus:outline-none"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            {/* 3. Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label htmlFor="remember-me" className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-surface-100 border-white/10 text-brand-cyan focus:ring-brand-cyan accent-brand-cyan"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            {/* 5. Primary Login Button */}
            <PrimaryButton
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full py-3.5 text-xs font-bold shadow-glow-cyan flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Login to NexoApps</span>
              )}
            </PrimaryButton>

            {/* 6. Secondary Create Account Link */}
            <div className="pt-3 border-t border-white/10 text-center text-xs text-text-muted">
              <span>Don't have an account? </span>
              {onSwitchToSignup ? (
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="font-semibold text-brand-cyan hover:underline focus:outline-none"
                >
                  Create Account
                </button>
              ) : (
                <Link href="/signup" className="font-semibold text-brand-cyan hover:underline">
                  Create Account
                </Link>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
