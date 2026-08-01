import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { PrimaryButton } from './ui/PrimaryButton';
import Link from 'next/link';

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
  returnUrl?: string;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSuccess,
  onSwitchToLogin,
  returnUrl,
}) => {
  const router = useRouter();
  const { signup } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // 1. Live Username Validation
  const usernameError = useMemo(() => {
    if (!username) return null;
    const clean = username.trim();
    if (clean.length < 3) return 'Username must be at least 3 characters';
    if (clean.length > 25) return 'Username cannot exceed 25 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(clean)) return 'Only letters, numbers, and underscores allowed';
    return null;
  }, [username]);

  // 2. Live Email Validation
  const emailError = useMemo(() => {
    if (!email) return null;
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return 'Please enter a valid email address format';
    return null;
  }, [email]);

  // 3. Password Requirements Verification
  const isPasswordValid = useMemo(() => {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;
    return true;
  }, [password]);

  // 4. Confirm Password Match Validation
  const passwordMismatch = useMemo(() => {
    if (!confirmPassword) return false;
    return password !== confirmPassword;
  }, [password, confirmPassword]);

  // Comprehensive Form Validity
  const isFormValid =
    username.trim().length >= 3 &&
    username.trim().length <= 25 &&
    !usernameError &&
    email.trim().length > 0 &&
    !emailError &&
    isPasswordValid &&
    confirmPassword.length > 0 &&
    !passwordMismatch &&
    acceptedTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Auto-trim spaces before saving (case-insensitive checks handled backend & service side)
      await signup({
        username: username.trim(),
        email: email.trim(),
        password,
      });

      // Show Premium Success Animation & Toast Flow
      setIsSuccess(true);

      setTimeout(() => {
        if (onSuccess) onSuccess();

        // Redirect back to page user originally came from if prompted during app download, else home
        const targetUrl = returnUrl || (router.query.from as string) || '/';
        router.push(targetUrl);
      }, 2200);
    } catch (err: any) {
      const msg = err.message || 'An error occurred during account creation. Please try again.';
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          /* Premium Celebration Animation & Toast */
          <motion.div
            key="success-celebration"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center py-8 space-y-5"
          >
            {/* Success Toast Box */}
            <div className="px-4 py-2.5 rounded-2xl bg-brand-emerald/20 border border-brand-emerald/40 text-brand-emerald text-xs font-bold flex items-center gap-2 shadow-glow-emerald animate-pulse">
              <Check className="w-4 h-4" />
              <span>Welcome to NexoApps!</span>
            </div>

            {/* Glowing Trophy Icon */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-emerald via-brand-cyan to-brand-violet p-1 shadow-glow-emerald flex items-center justify-center">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-brand-emerald animate-bounce" />
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="absolute inset-0 rounded-full bg-brand-emerald/30 blur-lg pointer-events-none"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Account Created Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary max-w-xs mx-auto leading-relaxed">
                You are automatically logged in. Redirecting to your destination...
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 text-xs font-semibold">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Verify your email to unlock all features.</span>
            </div>
          </motion.div>
        ) : (
          /* Signup Form */
          <motion.form
            key="signup-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-4 text-left"
            noValidate
          >
            {/* Friendly Error Alert Banner */}
            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5 shadow-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Username Field */}
            <div>
              <label htmlFor="signup-username" className="block text-xs font-semibold text-text-secondary mb-1">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                <input
                  id="signup-username"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="e.g. alex_dev"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  aria-invalid={!!usernameError}
                  aria-describedby={usernameError ? 'username-error' : undefined}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-all"
                />
              </div>
              {usernameError && (
                <p id="username-error" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {usernameError}
                </p>
              )}
            </div>

            {/* 2. Email Address Field */}
            <div>
              <label htmlFor="signup-email" className="block text-xs font-semibold text-text-secondary mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                <input
                  id="signup-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : undefined}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-all"
                />
              </div>
              {emailError && (
                <p id="email-error" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {emailError}
                </p>
              )}
            </div>

            {/* 3. Password Field */}
            <div>
              <label htmlFor="signup-password" className="block text-xs font-semibold text-text-secondary mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
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

              {/* Password Strength Meter & Interactive Real-time Checklist */}
              <PasswordStrengthMeter password={password} />
            </div>

            {/* 4. Confirm Password Field */}
            <div>
              <label htmlFor="signup-confirm-password" className="block text-xs font-semibold text-text-secondary mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-invalid={passwordMismatch}
                  aria-describedby={passwordMismatch ? 'confirm-password-error' : undefined}
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
                <p id="confirm-password-error" className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Passwords do not match
                </p>
              )}
            </div>

            {/* 5. Terms & Privacy Checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 rounded bg-surface-100 border-white/10 text-brand-cyan focus:ring-brand-cyan accent-brand-cyan"
              />
              <label htmlFor="terms" className="text-[11px] text-text-secondary leading-normal select-none">
                I accept the{' '}
                <Link href="/privacy" className="text-brand-cyan hover:underline font-semibold">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/terms" className="text-brand-cyan hover:underline font-semibold">
                  Terms & Conditions
                </Link>
                .
              </label>
            </div>

            {/* Primary Submit Button */}
            <PrimaryButton
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full py-3.5 text-xs font-bold shadow-glow-cyan flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </PrimaryButton>

            {/* Secondary Switch to Login Link */}
            <div className="pt-3 border-t border-white/10 text-center text-xs text-text-muted">
              <span>Already have an account? </span>
              {onSwitchToLogin ? (
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-semibold text-brand-cyan hover:underline focus:outline-none"
                >
                  Login
                </button>
              ) : (
                <Link href="/login" className="font-semibold text-brand-cyan hover:underline">
                  Login
                </Link>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

