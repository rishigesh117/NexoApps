/**
 * Download Service Layer
 * NexoApps Platform
 */

import { fetchApi } from './apiClient';
import { AuthService } from './authService';

export interface DownloadRecord {
  id: string;
  userId: string;
  appId: string;
  appSlug: string;
  appTitle: string;
  iconUrl?: string;
  tagline?: string;
  version: string;
  fileSize: string;
  downloadToken: string;
  deviceInfo: string;
  browser: string;
  os: string;
  ipAddress: string;
  status: 'Queued' | 'Preparing' | 'Downloading' | 'Completed' | 'Cancelled' | 'Failed';
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
}

export const downloadService = {
  // Initiate download for authenticated user
  initiateDownload: async (slug: string): Promise<DownloadRecord> => {
    const token = AuthService.getStoredAccessToken();
    const response = await fetchApi<{ success: boolean; data: DownloadRecord }>(`/downloads/apps/${slug}/download`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Fetch download history for user
  getDownloadHistory: async (): Promise<DownloadRecord[]> => {
    const token = AuthService.getStoredAccessToken();
    try {
      const response = await fetchApi<{ success: boolean; data: DownloadRecord[] }>('/downloads/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data || [];
    } catch {
      return [];
    }
  },

  // Fetch single download details
  getDownloadById: async (id: string): Promise<DownloadRecord | null> => {
    const token = AuthService.getStoredAccessToken();
    try {
      const response = await fetchApi<{ success: boolean; data: DownloadRecord }>(`/downloads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data || null;
    } catch {
      return null;
    }
  },
};
