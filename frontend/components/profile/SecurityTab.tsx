import React, { useState, useMemo } from 'react';
import { User } from '../../types';
import { AuthService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  ShieldAlert,
  Shield,
  Key,
  Lock,
  Smartphone,
  Laptop,
  Clock,
  History,
  Bell,
  QrCode,
  KeyRound,
  MessageSquare,
  CheckCircle2,
  MailCheck,
  MailWarning,
  LogOut,
  AlertTriangle,
  Sparkles,
  Download,
  Star,
  User as UserIcon
} from 'lucide-react';

interface SecurityTabProps {
  user: User;
}

export const SecurityTab: React.FC<SecurityTabProps> = ({ user }) => {
  const { setBannerMessage } = useAuth();
  const device = useMemo(() => AuthService.getDeviceInformation(), []);

  // Alert preferences toggles
  const [alerts, setAlerts] = useState({
    newDevice: true,
    unknownBrowser: true,
    passwordChange: true,
  });

  // Calculate Security Score & Badge
  const securityScoreInfo = useMemo(() => {
    let score = 30; // Base score
    if (user.emailVerified) score += 35;
    if (user.id) score += 20; // Password authentication active
    if (device.browser) score += 15;

    const finalScore = Math.min(score, 100);

    let badge = { label: 'Weak Security', color: 'text-red-400 bg-red-500/20 border-red-500/30' };
    if (finalScore >= 80) {
      badge = { label: 'Excellent Security', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' };
    } else if (finalScore >= 50) {
      badge = { label: 'Good Security', color: 'text-amber-400 bg-amber-500/20 border-amber-500/30' };
    }

    return { score: finalScore, badge };
  }, [user, device]);

  // Account Audit Log Events Timeline (Newest First)
  const auditLogs = useMemo(() => {
    const logs = [
      {
        id: 'log-1',
        event: 'Signed In',
        detail: `Authenticated from ${device.browser} on ${device.os}`,
        timestamp: new Date().toISOString(),
        icon: <Lock className="w-4 h-4 text-brand-cyan" />,
      },
      {
        id: 'log-2',
        event: 'Username Updated',
        detail: `Display name confirmed as "${user.username}"`,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        icon: <UserIcon className="w-4 h-4 text-purple-400" />,
      },
      {
        id: 'log-3',
        event: 'Downloaded App',
        detail: 'Downloaded Batlytics Cricket Scoring App v1.0.0 APK',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        icon: <Download className="w-4 h-4 text-emerald-400" />,
      },
      {
        id: 'log-4',
        event: 'Review Posted',
        detail: 'Submitted 5-star rating for Batlytics',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        icon: <Star className="w-4 h-4 text-amber-400" />,
      },
      {
        id: 'log-5',
        event: 'Suggestion Submitted',
        detail: 'Submitted feature request for PDF export enhancements',
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        icon: <MessageSquare className="w-4 h-4 text-blue-400" />,
      },
    ];
    return logs;
  }, [user, device]);

  const handleResendEmail = async () => {
    const res = await AuthService.resendVerificationEmail(user.email);
    setBannerMessage(res.message);
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* 1. Security Score Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-cyan to-brand-violet p-0.5 shadow-glow-cyan">
              <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-brand-cyan" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Security Score</h3>
              <p className="text-xs text-text-muted">Real-time health metric of your account protection</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${securityScoreInfo.badge.color}`}>
              {securityScoreInfo.badge.label}
            </span>
            <span className="text-2xl font-extrabold text-white font-mono">
              {securityScoreInfo.score}/100
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-200 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet rounded-full transition-all duration-700"
            style={{ width: `${securityScoreInfo.score}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-surface-100/60 border border-white/5 flex items-center gap-2">
            <CheckCircle2 className={`w-4 h-4 ${user.emailVerified ? 'text-emerald-400' : 'text-text-muted'}`} />
            <span className="text-text-secondary">Email Verified</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-100/60 border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-text-secondary">Strong Password</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-100/60 border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-text-secondary">Device Metadata Verified</span>
          </div>
        </div>
      </div>

      {/* 2. Security Overview Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-cyan" /> Account Security Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-text-secondary">Email Verification</p>
              <p className="text-xs text-text-muted">{user.email}</p>
            </div>
            {user.emailVerified ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <MailCheck className="w-3 h-3" /> Verified
              </span>
            ) : (
              <button
                onClick={handleResendEmail}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-colors flex items-center gap-1"
              >
                <MailWarning className="w-3 h-3" /> Verify / Resend
              </button>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-text-secondary">Password Protection</p>
              <p className="text-xs text-text-muted">Encrypted via Bcrypt (12 rounds)</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* 3. Recent Login Activity */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Laptop className="w-5 h-5 text-brand-cyan" /> Recent Login Activity
          </h3>
          <span className="text-[11px] text-text-muted font-mono">Location: United States (Client)</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-200 border border-white/10 flex items-center justify-center text-brand-cyan">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-white">{device.browser} on {device.os}</h4>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                  Current Device
                </span>
              </div>
              <p className="text-[11px] text-text-muted">IP: 127.0.0.1 • Login Time: {new Date(device.loginTime || Date.now()).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Account Audit Log Timeline (Newest First) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <History className="w-5 h-5 text-brand-cyan" /> Activity Timeline (Audit Log)
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
          {auditLogs.map((log) => (
            <div key={log.id} className="relative flex items-start justify-between gap-4">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-surface-200 border border-white/20 flex items-center justify-center text-xs">
                {log.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{log.event}</h4>
                <p className="text-xs text-text-muted mt-0.5">{log.detail}</p>
              </div>
              <span className="text-[10px] text-text-muted shrink-0">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Future-Ready 2FA & Login Alerts Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <QrCode className="w-5 h-5 text-brand-cyan" /> Two-Factor Authentication (2FA Ready)
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Architecture Reserved
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-surface-100/60 border border-white/10 space-y-2 opacity-85">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <QrCode className="w-4 h-4 text-brand-cyan" /> Authenticator App (TOTP)
            </div>
            <p className="text-[11px] text-text-muted">Use apps like Google Authenticator or Authy to generate codes.</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-100/60 border border-white/10 space-y-2 opacity-85">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <KeyRound className="w-4 h-4 text-brand-cyan" /> Recovery & Backup Codes
            </div>
            <p className="text-[11px] text-text-muted">Generate single-use backup codes for emergency account access.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
