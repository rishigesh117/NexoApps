/**
 * Developer Workspace & Submission API Service Layer
 * NexoApps Platform - Phase 4C
 */

import { fetchApi } from './apiClient';
import { AuthService } from './authService';
import {
  DeveloperApplicationRecord,
  SubmissionItemRecord,
  SubmissionCommentRecord,
  DeveloperNotificationItem,
  DeveloperWorkspaceStats,
  DeveloperProfile,
  AppItem,
} from '../types';

const getAuthHeader = (): Record<string, string> => {
  const token = AuthService.getStoredAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const developerService = {
  // Apply to become a Developer
  applyForDeveloper: async (data: Partial<DeveloperApplicationRecord>): Promise<DeveloperApplicationRecord> => {
    const response = await fetchApi<{ success: boolean; data: DeveloperApplicationRecord }>('/developer/apply', {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.data;
  },

  // Check Application Status
  getApplicationStatus: async (): Promise<DeveloperApplicationRecord | null> => {
    const response = await fetchApi<{ success: boolean; data: DeveloperApplicationRecord }>('/developer/application-status', {
      headers: getAuthHeader(),
    });
    return response.data || null;
  },

  // Fetch Developer Dashboard Data
  getDashboard: async (): Promise<{
    profile: DeveloperProfile;
    stats: DeveloperWorkspaceStats;
    myApps: AppItem[];
    notifications: DeveloperNotificationItem[];
  }> => {
    const response = await fetchApi<{ success: boolean; data: any }>('/developer/dashboard', {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Get Public Developer Profile by Username
  getPublicProfile: async (username: string): Promise<DeveloperProfile & { publishedApps: AppItem[] }> => {
    const response = await fetchApi<{ success: boolean; data: any }>(`/developer/profile/public/${username}`);
    return response.data;
  },

  // Update Developer Profile
  updateProfile: async (data: Partial<DeveloperProfile>): Promise<DeveloperProfile> => {
    const response = await fetchApi<{ success: boolean; data: DeveloperProfile }>('/developer/profile', {
      method: 'PATCH',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.data;
  },

  // Submit App for Owner Review
  submitApp: async (data: any): Promise<SubmissionItemRecord> => {
    const response = await fetchApi<{ success: boolean; data: SubmissionItemRecord }>('/developer/submit-app', {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.data;
  },

  // Developer Notifications
  getNotifications: async (): Promise<{ notifications: DeveloperNotificationItem[]; unreadCount: number }> => {
    const response = await fetchApi<{ success: boolean; data: { notifications: DeveloperNotificationItem[]; unreadCount: number } }>(
      '/developer/notifications',
      { headers: getAuthHeader() }
    );
    return response.data || { notifications: [], unreadCount: 0 };
  },

  markNotificationsRead: async (): Promise<DeveloperNotificationItem[]> => {
    const response = await fetchApi<{ success: boolean; data: DeveloperNotificationItem[] }>('/developer/notifications/read', {
      method: 'POST',
      headers: getAuthHeader(),
    });
    return response.data || [];
  },

  // Owner Review Panel (Admin API)
  getSubmissionQueue: async (status?: string): Promise<SubmissionItemRecord[]> => {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    const response = await fetchApi<{ success: boolean; data: SubmissionItemRecord[] }>(`/admin/submissions${query}`, {
      headers: getAuthHeader(),
    });
    return response.data || [];
  },

  reviewSubmission: async (id: string, action: 'approve' | 'reject' | 'changes_requested', reason?: string): Promise<SubmissionItemRecord> => {
    const response = await fetchApi<{ success: boolean; data: SubmissionItemRecord }>(`/admin/submissions/${id}/review`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, reason }),
    });
    return response.data;
  },

  addComment: async (submissionId: string, commentText: string): Promise<SubmissionCommentRecord> => {
    const response = await fetchApi<{ success: boolean; data: SubmissionCommentRecord }>(`/admin/submissions/${submissionId}/comments`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentText }),
    });
    return response.data;
  },

  getComments: async (submissionId: string): Promise<SubmissionCommentRecord[]> => {
    const response = await fetchApi<{ success: boolean; data: SubmissionCommentRecord[] }>(`/admin/submissions/${submissionId}/comments`, {
      headers: getAuthHeader(),
    });
    return response.data || [];
  },
};
