import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types';
import { AuthService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  bannerMessage: string | null;
  setBannerMessage: (msg: string | null) => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (credentials: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [remindedLater, setRemindedLater] = useState(false);

  useEffect(() => {
    const storedUser = AuthService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      AuthService.getCurrentUserProfile().then((refreshed) => {
        if (refreshed) setUser(refreshed);
      });
    }
  }, []);

  const role: UserRole = user ? user.role : 'GUEST';
  const isAuthenticated = !!user;
  const isEmailUnverified = isAuthenticated && user && !user.emailVerified && !remindedLater;

  const login = async (credentials: { email: string; password: string }) => {
    const data = await AuthService.login(credentials);
    setUser(data.user);
    if (data.bannerMessage) {
      setBannerMessage(data.bannerMessage);
    }
  };

  const signup = async (credentials: { username: string; email: string; password: string }) => {
    const data = await AuthService.signup(credentials);
    setUser(data.user);
    setBannerMessage('Your account has been created successfully. Verify your email to unlock all features.');
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setBannerMessage(null);
  };

  const refreshUser = async () => {
    const refreshed = await AuthService.getCurrentUserProfile();
    if (refreshed) setUser(refreshed);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        bannerMessage,
        setBannerMessage,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {isEmailUnverified && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-300 px-4 py-2.5 text-xs font-semibold flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span>Email not verified: Verify your email to unlock all features.</span>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap justify-end">
            <button
              onClick={async () => {
                try {
                  await AuthService.verifyEmailToken(user?.email || '');
                  await refreshUser();
                  setBannerMessage('Email verified successfully! All features unlocked.');
                } catch (err: any) {
                  setBannerMessage('Email verification process triggered.');
                }
              }}
              className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-all text-[11px] shadow-sm"
            >
              Verify Now
            </button>

            <button
              onClick={async () => {
                const res = await AuthService.resendVerificationEmail(user?.email || '');
                setBannerMessage(res.message);
              }}
              className="px-3 py-1 rounded-lg bg-surface-200 hover:bg-surface-100 text-white font-semibold text-[11px] border border-white/10 transition-colors"
            >
              Resend Verification Email
            </button>

            <button
              onClick={() => setRemindedLater(true)}
              className="text-[11px] text-text-muted hover:text-white transition-colors underline"
            >
              Remind Me Later
            </button>
          </div>
        </div>
      )}
      {!isEmailUnverified && bannerMessage && (
        <div className="bg-brand-cyan/20 border-b border-brand-cyan/30 text-brand-cyan px-4 py-2 text-center text-xs font-semibold flex items-center justify-between">
          <span>{bannerMessage}</span>
          <button
            onClick={() => setBannerMessage(null)}
            className="ml-4 hover:underline text-[10px] text-text-muted"
          >
            Dismiss
          </button>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
