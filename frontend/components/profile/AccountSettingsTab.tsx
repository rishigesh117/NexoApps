import React, { useState, useMemo } from 'react';
import { User } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/authService';
import { PasswordStrengthMeter } from '../PasswordStrengthMeter';
import { PrimaryButton } from '../ui/PrimaryButton';
import { User as UserIcon, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, LogOut, ShieldAlert } from 'lucide-react';

interface AccountSettingsTabProps {
  user: User;
}

export const AccountSettingsTab: React.FC<AccountSettingsTabProps> = ({ user }) => {
  const { refreshUser, logout } = useAuth();

  // Username Change State
  const [username, setUsername] = useState(user.username || '');
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameSuccess, setUsernameSuccess] = useState<string | null>(null);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Live Username Validation
  const usernameValidationError = useMemo(() => {
    if (!username) return null;
    const clean = username.trim();
    if (clean.length < 3) return 'Username must be at least 3 characters';
    if (clean.length > 25) return 'Username cannot exceed 25 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(clean)) return 'Only letters, numbers, and underscores allowed';
    return null;
  }, [username]);

  // Live Password Validation
  const isNewPasswordValid = useMemo(() => {
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

  const isUsernameFormValid =
    username.trim().length >= 3 &&
    username.trim().length <= 25 &&
    !usernameValidationError &&
    username.trim().toLowerCase() !== (user.username || '').toLowerCase();

  const isPasswordFormValid =
    currentPassword.length > 0 &&
    isNewPasswordValid &&
    confirmPassword.length > 0 &&
    !passwordMismatch;

  // Handle Username Update
  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUsernameFormValid || isUpdatingUsername) return;

    setIsUpdatingUsername(true);
    setUsernameError(null);
    setUsernameSuccess(null);

    try {
      await AuthService.updateProfile({ username: username.trim() });
      await refreshUser();
      setUsernameSuccess('Username updated successfully!');
      setIsUpdatingUsername(false);
    } catch (err: any) {
      setUsernameError(err.message || 'Failed to update username');
      setIsUpdatingUsername(false);
    }
  };

  // Handle Password Update
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordFormValid || isUpdatingPassword) return;

    setIsUpdatingPassword(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    try {
      await AuthService.resetPassword({ newPassword });
      setPasswordSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsUpdatingPassword(false);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password');
      setIsUpdatingPassword(false);
    }
  };

  // Handle Logout All Devices
  const handleLogoutAll = async () => {
    if (confirm('Are you sure you want to log out from all devices?')) {
      await AuthService.logoutAllDevices();
      window.location.href = '/login';
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* 1. Change Username Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-200 border border-white/10 flex items-center justify-center text-brand-cyan">
            <UserIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Change Username</h3>
            <p className="text-xs text-text-muted">Your display name on NexoApps platform</p>
          </div>
        </div>

        {usernameSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{usernameSuccess}</span>
          </div>
        )}

        {usernameError && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{usernameError}</span>
          </div>
        )}

        <form onSubmit={handleUpdateUsername} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">New Username</label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan transition-colors"
              />
            </div>
            {usernameValidationError && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {usernameValidationError}
              </p>
            )}
          </div>

          <PrimaryButton
            type="submit"
            disabled={!isUsernameFormValid || isUpdatingUsername}
            className="py-2.5 px-6 text-xs font-bold shadow-glow-cyan"
          >
            {isUpdatingUsername ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Updating Username...
              </span>
            ) : (
              'Save Username'
            )}
          </PrimaryButton>
        </form>
      </div>

      {/* 2. Change Password Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-200 border border-white/10 flex items-center justify-center text-brand-cyan">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Change Password</h3>
            <p className="text-xs text-text-muted">Ensure your account uses a strong, unique password</p>
          </div>
        </div>

        {passwordSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        {passwordError && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">Current Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-text-muted hover:text-white transition-colors p-0.5"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <PasswordStrengthMeter password={newPassword} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">Confirm New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan transition-colors"
              />
            </div>
            {passwordMismatch && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Passwords do not match
              </p>
            )}
          </div>

          <PrimaryButton
            type="submit"
            disabled={!isPasswordFormValid || isUpdatingPassword}
            className="py-2.5 px-6 text-xs font-bold shadow-glow-cyan"
          >
            {isUpdatingPassword ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Updating Password...
              </span>
            ) : (
              'Update Password'
            )}
          </PrimaryButton>
        </form>
      </div>

      {/* 3. Account Actions Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" /> Account Actions
        </h3>
        <p className="text-xs text-text-muted">Manage active device sessions and login access</p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => logout()}
            className="px-5 py-3 rounded-xl bg-surface-200 hover:bg-surface-100 border border-white/10 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4 text-brand-cyan" />
            <span>Logout Current Device</span>
          </button>

          <button
            onClick={handleLogoutAll}
            className="px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout All Devices</span>
          </button>
        </div>
      </div>

    </div>
  );
};
