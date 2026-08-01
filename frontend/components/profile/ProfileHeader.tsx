import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { User } from '../../types';
import { ShieldCheck, MailCheck, MailWarning, Camera, Trash2, Smartphone, Calendar, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { AuthService } from '../../services/authService';

interface ProfileHeaderProps {
  user: User;
  onRefresh?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  // First letter avatar
  const avatarLetter = (user.username || user.email || 'U').charAt(0).toUpperCase();

  // Current Device Info
  const device = useMemo(() => AuthService.getDeviceInformation(), []);

  // Format joined date
  const joinedDateFormatted = useMemo(() => {
    if (!user.createdAt) return 'Recently Joined';
    try {
      return new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'Recently Joined';
    }
  }, [user.createdAt]);

  // Profile Completion Percentage Calculation
  const completionPercentage = useMemo(() => {
    let score = 40; // Base account creation
    if (user.username && user.username.length >= 3) score += 20;
    if (user.emailVerified) score += 25;
    if (user.role) score += 15;
    return Math.min(score, 100);
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden space-y-6"
    >
      {/* Ambient Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-cyan/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-violet/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Avatar & User Meta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          
          {/* Default Avatar with First Letter */}
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet p-1 shadow-glow-cyan">
              <div className="w-full h-full bg-surface-100 rounded-[22px] flex items-center justify-center font-display font-extrabold text-3xl sm:text-4xl text-white shadow-inner">
                {avatarLetter}
              </div>
            </div>
            {/* Developer/Verification Badge */}
            {user.role === 'ADMIN' && (
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1.5 rounded-xl border border-background shadow-lg" title="Admin / Developer Badge">
                <Award className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {user.username}
              </h1>
              
              {/* Role Badge */}
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                user.role === 'ADMIN'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40'
              }`}>
                {user.role}
              </span>

              {/* Email Verified Badge */}
              {user.emailVerified ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                  <MailCheck className="w-3 h-3" /> Verified
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1">
                  <MailWarning className="w-3 h-3" /> Unverified
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-text-secondary font-medium">{user.email}</p>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-text-muted pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-cyan" /> Joined {joinedDateFormatted}
              </span>
              <span className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-brand-cyan" /> {device.browser} ({device.os})
              </span>
            </div>
          </div>

        </div>

        {/* Right Photo Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => alert('Photo upload feature will be available in future releases!')}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Camera className="w-4 h-4 text-brand-cyan" />
            <span>Change Photo</span>
          </button>

          <button
            onClick={() => alert('Avatar reset to default letter.')}
            className="p-2.5 rounded-xl bg-surface-100 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-text-muted hover:text-red-400 transition-colors"
            title="Remove Photo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Profile Completion Bar */}
      <div className="pt-4 border-t border-white/10 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-muted font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" /> Profile Completion:
          </span>
          <span className="font-extrabold text-white">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-surface-200 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
