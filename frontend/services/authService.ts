/**
 * Authentication Service Client
 * Handles token storage, user session, signup, login, logout, and token refresh
 * NexoApps Platform
 */

import { fetchApi } from './apiClient';
import { User, UserRole } from '../types';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  bannerMessage?: string;
  message?: string;
}

const ACCESS_TOKEN_KEY = 'nexoapps_access_token';
const REFRESH_TOKEN_KEY = 'nexoapps_refresh_token';
const USER_KEY = 'nexoapps_user';
const VERIFICATION_TOKEN_KEY = 'nexoapps_verification_token';

export const AuthService = {
  getStoredAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getStoredRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getStoredUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userJson = localStorage.getItem(USER_KEY);
    try {
      if (!userJson) return null;
      return JSON.parse(userJson) as User;
    } catch (e) {
      return null;
    }
  },

  /**
   * Get the stored email verification token (sent by backend during signup).
   */
  getStoredVerificationToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(VERIFICATION_TOKEN_KEY);
  },

  saveSession: (data: AuthResponse) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    // Clear any stored verification token after session update
    localStorage.removeItem(VERIFICATION_TOKEN_KEY);
  },

  clearSession: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(VERIFICATION_TOKEN_KEY);
  },

  signup: async (payload: { username: string; email: string; password: string }): Promise<AuthResponse> => {
    const response = await fetchApi<{ success: boolean; data: AuthResponse }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (response.data) {
      AuthService.saveSession(response.data);
    }
    return response.data;
  },

  login: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await fetchApi<{ success: boolean; data: AuthResponse }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (response.data) {
      AuthService.saveSession(response.data);
    }
    return response.data;
  },

  logout: async (): Promise<boolean> => {
    const refreshToken = AuthService.getStoredRefreshToken();
    try {
      if (refreshToken) {
        await fetchApi('/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (e) {
      // Ignore network errors on logout
    } finally {
      AuthService.clearSession();
    }
    return true;
  },

  refreshToken: async (): Promise<string | null> => {
    const refreshToken = AuthService.getStoredRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await fetchApi<{ success: boolean; data: { accessToken: string } }>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
        return response.data.accessToken;
      }
    } catch (e) {
      AuthService.clearSession();
    }
    return null;
  },

  getCurrentUserProfile: async (): Promise<User | null> => {
    const token = AuthService.getStoredAccessToken();
    if (!token) return null;

    try {
      const response = await fetchApi<{ success: boolean; data: User }>('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data));
        return response.data;
      }
    } catch (e) {
      // Session might be expired
    }
    return AuthService.getStoredUser();
  },

  /**
   * Verify the user's email using a cryptographic verification token.
   * On success, the backend returns a fresh session (new access + refresh tokens)
   * with updated user data (emailVerified: true), which we save locally.
   *
   * This prevents stale session data and ensures the user's role/permissions
   * are correctly reflected after verification.
   */
  verifyEmailToken: async (verificationToken: string): Promise<AuthResponse | null> => {
    try {
      const response = await fetchApi<{ success: boolean; data: AuthResponse }>('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ token: verificationToken }),
      });
      if (response.data && response.data.accessToken) {
        // Save the fresh session returned by the backend
        AuthService.saveSession(response.data);
        return response.data;
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Request the backend to resend a verification email.
   * This is separate from verifyEmailToken — it generates a new token
   * and sends it to the user's email.
   */
  resendVerificationEmail: async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetchApi<{ success: boolean; message?: string }>('/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });
      return { success: true, message: response.message || 'Verification email resent successfully!' };
    } catch (e: any) {
      return { success: false, message: e.message || 'Failed to resend verification email.' };
    }
  },

  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetchApi<{ success: boolean; message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email: email.trim() }),
    });
    return response;
  },

  resetPassword: async (payload: { token?: string; newPassword?: string }): Promise<{ success: boolean; message: string }> => {
    const response = await fetchApi<{ success: boolean; message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response;
  },

  getDeviceInformation: () => {
    if (typeof window === 'undefined') return { browser: 'Server', os: 'Unknown' };
    const ua = navigator.userAgent;
    let browser = 'Chrome/Modern Browser';
    let os = 'Desktop';

    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';

    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    return { browser, os, userAgent: ua, loginTime: new Date().toISOString() };
  },

  updateProfile: async (payload: { username?: string; profileImage?: string }): Promise<User> => {
    const token = AuthService.getStoredAccessToken();
    const response = await fetchApi<{ success: boolean; data: User }>('/users/profile', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (response.data) {
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    }
    return response.data;
  },

  getActiveSessions: async (): Promise<Array<{ id: string; deviceInfo: string; ipAddress: string; current: boolean; lastActive: string }>> => {
    const token = AuthService.getStoredAccessToken();
    try {
      const response = await fetchApi<{ success: boolean; data: Array<any> }>('/session/active', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data || [];
    } catch (e) {
      return [];
    }
  },

  logoutAllDevices: async (): Promise<boolean> => {
    const token = AuthService.getStoredAccessToken();
    try {
      await fetchApi('/session/logout-all', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      // Ignore
    } finally {
      AuthService.clearSession();
    }
    return true;
  },
};
