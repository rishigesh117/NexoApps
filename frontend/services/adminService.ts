/**
 * Admin API Service Layer
 * NexoApps Platform - Phase 3E
 */

import { fetchApi } from './apiClient';
import { AuthService } from './authService';
import {
  AdminDashboardStats,
  DeveloperProfile,
  ActivityLogItem,
  SystemHealthStatus,
  UserAdminRecord,
  AppItem,
  Review,
} from '../types';

export interface AdminOverviewResponse {
  stats: AdminDashboardStats;
  systemHealth: SystemHealthStatus;
  activity: ActivityLogItem[];
  analytics: {
    monthlyDownloads: { month: string; count: number }[];
    ratingDistribution: Record<number, number>;
    categoryShare: { category: string; percentage: number }[];
  };
}

const getAuthHeader = (): Record<string, string> => {
  const token = AuthService.getStoredAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminService = {
  // Fetch main dashboard statistics & health
  getOverview: async (): Promise<AdminOverviewResponse> => {
    const response = await fetchApi<{ success: boolean; data: AdminOverviewResponse }>(
      '/admin/dashboard/dashboard',
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Fetch users for admin management
  getUsers: async (params?: { search?: string; role?: string; status?: string }): Promise<UserAdminRecord[]> => {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.role) query.append('role', params.role);
    if (params?.status) query.append('status', params.status);

    const response = await fetchApi<{ success: boolean; data: UserAdminRecord[] }>(
      `/admin/users?${query.toString()}`,
      { headers: getAuthHeader() }
    );
    return response.data || [];
  },

  // Update user role or status
  updateUser: async (userId: string, data: { status?: string; role?: string }): Promise<UserAdminRecord> => {
    const response = await fetchApi<{ success: boolean; data: UserAdminRecord }>(
      `/admin/users/${userId}`,
      {
        method: 'PATCH',
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return response.data;
  },

  // Fetch developers list
  getDevelopers: async (params?: { search?: string; status?: string; verifiedOnly?: boolean }): Promise<DeveloperProfile[]> => {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.status) query.append('status', params.status);
    if (params?.verifiedOnly) query.append('verifiedOnly', 'true');

    const response = await fetchApi<{ success: boolean; data: DeveloperProfile[] }>(
      `/admin/developers?${query.toString()}`,
      { headers: getAuthHeader() }
    );
    return response.data || [];
  },

  // Update developer status/verification
  updateDeveloper: async (devId: string, data: { status?: string; isVerified?: boolean }): Promise<DeveloperProfile> => {
    const response = await fetchApi<{ success: boolean; data: DeveloperProfile }>(
      `/admin/developers/${devId}`,
      {
        method: 'PATCH',
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return response.data;
  },

  // App management: Create App
  createApp: async (appData: Partial<AppItem>): Promise<AppItem> => {
    const response = await fetchApi<{ success: boolean; data: AppItem }>('/admin/apps', {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appData),
    });
    return response.data;
  },

  // App management: Update App
  updateApp: async (appId: string, appData: Partial<AppItem>): Promise<AppItem> => {
    const response = await fetchApi<{ success: boolean; data: AppItem }>(`/admin/apps/${appId}`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appData),
    });
    return response.data;
  },

  // App management: Delete App
  deleteApp: async (appId: string): Promise<boolean> => {
    const response = await fetchApi<{ success: boolean }>(`/admin/apps/${appId}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    return response.success;
  },

  // Fetch reviews for moderation
  getReviews: async (): Promise<Review[]> => {
    const response = await fetchApi<{ success: boolean; data: Review[] }>('/admin/reviews', {
      headers: getAuthHeader(),
    });
    return response.data || [];
  },

  // Fetch download logs
  getDownloads: async (): Promise<any[]> => {
    const response = await fetchApi<{ success: boolean; data: any[] }>('/admin/downloads', {
      headers: getAuthHeader(),
    });
    return response.data || [];
  },

  // Phase 4A: Upload or save draft app
  uploadApp: async (appData: Partial<AppItem>): Promise<AppItem> => {
    const response = await fetchApi<{ success: boolean; data: AppItem }>('/admin/apps/upload', {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appData),
    });
    return response.data;
  },

  // Phase 4A: Publish app to store
  publishApp: async (appId: string): Promise<AppItem> => {
    const response = await fetchApi<{ success: boolean; data: AppItem }>(`/admin/apps/${appId}/publish`, {
      method: 'POST',
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Phase 4A: Archive app
  archiveApp: async (appId: string): Promise<AppItem> => {
    const response = await fetchApi<{ success: boolean; data: AppItem }>(`/admin/apps/${appId}/archive`, {
      method: 'POST',
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Phase 4A: Get draft apps
  getDraftApps: async (): Promise<AppItem[]> => {
    const response = await fetchApi<{ success: boolean; data: AppItem[] }>('/admin/apps/drafts', {
      headers: getAuthHeader(),
    });
    return response.data || [];
  },

  // Phase 4A: Get published apps
  getPublishedApps: async (): Promise<AppItem[]> => {
    const response = await fetchApi<{ success: boolean; data: AppItem[] }>('/admin/apps/published', {
      headers: getAuthHeader(),
    });
    return response.data || [];
  },

  // Phase 4A: Get archived apps
  getArchivedApps: async (): Promise<AppItem[]> => {
    const response = await fetchApi<{ success: boolean; data: AppItem[] }>('/admin/apps/archived', {
      headers: getAuthHeader(),
    });
    return response.data || [];
  },

  // Phase 4A: Get owner portal dashboard stats
  getOwnerStats: async (): Promise<any> => {
    const response = await fetchApi<{ success: boolean; data: any }>('/admin/apps/owner-stats', {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Phase 4B: Validate APK binary
  validateApk: async (apkData: any): Promise<any> => {
    const response = await fetchApi<{ success: boolean; data: any }>('/admin/pipeline/validate-apk', {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(apkData),
    });
    return response.data;
  },

  // Phase 4B: Process Media
  processMedia: async (mediaData: any): Promise<any> => {
    const response = await fetchApi<{ success: boolean; data: any }>('/admin/pipeline/process-media', {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(mediaData),
    });
    return response.data;
  },

  // Phase 4B: Get Owner Analytics
  getOwnerAnalytics: async (): Promise<any> => {
    const response = await fetchApi<{ success: boolean; data: any }>('/admin/pipeline/analytics', {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Phase 4B: Version History
  getVersions: async (appId: string): Promise<any[]> => {
    const response = await fetchApi<{ success: boolean; data: any[] }>(`/admin/pipeline/versions/${appId}`, {
      headers: getAuthHeader(),
    });
    return response.data || [];
  },

  createVersion: async (appId: string, versionData: any): Promise<any> => {
    const response = await fetchApi<{ success: boolean; data: any }>(`/admin/pipeline/versions/${appId}`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(versionData),
    });
    return response.data;
  },

  rollbackVersion: async (appId: string, versionId: string): Promise<any> => {
    const response = await fetchApi<{ success: boolean; data: any }>(`/admin/pipeline/versions/${appId}/rollback`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ versionId }),
    });
    return response.data;
  },

  // Phase 4B: Owner Notifications
  getNotifications: async (): Promise<{ notifications: any[]; unreadCount: number }> => {
    const response = await fetchApi<{ success: boolean; data: { notifications: any[]; unreadCount: number } }>(
      '/admin/pipeline/notifications',
      { headers: getAuthHeader() }
    );
    return response.data || { notifications: [], unreadCount: 0 };
  },

  markNotificationsRead: async (): Promise<any[]> => {
    const response = await fetchApi<{ success: boolean; data: any[] }>('/admin/pipeline/notifications/read', {
      method: 'POST',
      headers: getAuthHeader(),
    });
    return response.data || [];
  },
};
